import { QueryCache, QueryClient } from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      refetchOnMount: 'always',
      retry: 0,
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});

export const queryCache = new QueryCache({});
