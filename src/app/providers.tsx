// app/providers.jsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryStreamedHydration> */}
      {children}
      {/* </ReactQueryStreamedHydration> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
