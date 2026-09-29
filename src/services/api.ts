import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true, // required to send/receive the httpOnly refreshToken cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - inject JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const isAuthEndpoint = (url?: string) =>
  !!url && (url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/logout'));

// The refresh token is single-use — every POST /auth/refresh revokes the cookie it was
// sent and sets a new one. When the access token expires, a page typically has several
// requests in flight that all 401 together; if each fired its own refresh, only the first
// would succeed and the rest (still carrying the now-revoked cookie) would fail and log
// the user out. So concurrent 401s in this tab share one in-flight refresh, and
// navigator.locks makes refreshes in other tabs of the app wait their turn (by then the
// browser holds the rotated cookie, so theirs succeeds too).
let refreshInFlight: Promise<string> | null = null;

const requestNewAccessToken = async (): Promise<string> => {
  const { data } = await apiClient.post<{ accessToken: string }>('/auth/refresh');
  useAuthStore.getState().setToken(data.accessToken);
  return data.accessToken;
};

const refreshAccessToken = (): Promise<string> => {
  if (!refreshInFlight) {
    const locked =
      typeof navigator !== 'undefined' && navigator.locks
        ? new Promise<string>((resolve, reject) => {
            // The lock is held until the returned promise settles, i.e. for the whole refresh.
            navigator.locks.request('pwc-auth-refresh', () =>
              requestNewAccessToken().then(resolve, reject)
            );
          })
        : requestNewAccessToken();
    refreshInFlight = locked.finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};

// Response interceptor - on a 401 from a non-auth call, refresh the access token once
// (shared across concurrent 401s, see above) and retry; otherwise clear the session and
// bounce to login. A failed /auth/login itself is left to the caller (Login page) to
// display, not treated as a session expiry.
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest || isAuthEndpoint(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      useAuthStore.getState().clearSession();
      window.location.href = ROUTES.LOGIN;
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearSession();
      window.location.href = ROUTES.LOGIN;
      return Promise.reject(refreshError);
    }
  }
);
