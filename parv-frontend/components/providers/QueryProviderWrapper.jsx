// "use client";

// import { QueryProvider } from "@/lib/api/providers";

// export function QueryProviderWrapper({ children }) {
//   return <QueryProvider>{children}</QueryProvider>;
// }

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function QueryProviderWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
