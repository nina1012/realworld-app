import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Notifications } from '@/components/notifications';

export type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  return (
    <>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <ErrorBoundary
          fallback={
            <div>Something went wrong....:( </div>
          }
          onError={console.error}
        >
          {children}
        </ErrorBoundary>
        <Footer />
        {IS_DEVELOPMENT && <ReactQueryDevtools />}
      </QueryClientProvider>
    </>
  );
};
