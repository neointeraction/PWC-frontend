import { useEffect, useState } from 'react';

/**
 * Returns the current timestamp and re-renders the caller every `intervalMs`, so
 * time-gated UI (e.g. the "Join" button's 10-minutes-before window) appears and
 * disappears on its own without needing a page refresh.
 */
export const useNow = (intervalMs = 15_000): number => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    const onVisible = () => {
      if (document.visibilityState === 'visible') setNow(Date.now());
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [intervalMs]);
  return now;
};
