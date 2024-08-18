import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppScreen } from '@/screens';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppScreen />
    </QueryClientProvider>
  );
}
