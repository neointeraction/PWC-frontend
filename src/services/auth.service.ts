import { LoginPayload, LoginResponse, User } from '@/types';

const MOCK_SUPER_ADMIN: User = {
  id: 'user-super-admin',
  name: 'Alex Rivera (Super Admin)',
  email: 'admin@pwc.com',
  role: 'super_admin',
};

const MOCK_ADMIN_SARAH: User = {
  id: 'user-admin-sarah',
  name: 'Sarah Connor',
  email: 'sarah.connor@pwc-global.com',
  role: 'admin',
};

const MOCK_COUNSELOR_JOHN: User = {
  id: 'user-counselor-john',
  name: 'John Doe',
  email: 'counselor@pwc.com',
  role: 'counselor',
};

const MOCK_TOKEN = 'mock-jwt-token-12345';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    if (payload.email === 'admin@pwc.com') {
      return {
        user: MOCK_SUPER_ADMIN,
        token: MOCK_TOKEN,
      };
    }

    if (payload.email === 'sarah.connor@pwc-global.com') {
      return {
        user: MOCK_ADMIN_SARAH,
        token: MOCK_TOKEN,
      };
    }

    if (payload.email === 'counselor@pwc.com') {
      return {
        user: MOCK_COUNSELOR_JOHN,
        token: MOCK_TOKEN,
      };
    }

    if (payload.password.length > 0) {
      return {
        user: {
          id: 'user-admin',
          name: payload.email.split('@')[0].replace('.', ' ') || 'kREATE Admin',
          email: payload.email,
          role: 'admin',
        },
        token: MOCK_TOKEN,
      };
    }

    throw new Error('Invalid email or password');
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  refreshToken: async (token: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (token === MOCK_TOKEN) {
      return MOCK_TOKEN;
    }
    throw new Error('Invalid token');
  },
};
