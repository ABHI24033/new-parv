"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data remains fresh for 2 minutes — no refetch while fresh
        staleTime: 2 * 60 * 1000,
        // Keep unused cached data for 5 minutes before garbage collection
        gcTime: 5 * 60 * 1000,
        // Don't spam the server on window focus or reconnect
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // Retry once on failure, not 3 times (default)
        retry: 1,
      },
    },
  });
}

export default function QueryProviderWrapper({ children }) {
  // Create the client once per component lifecycle, safe for SSR
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
