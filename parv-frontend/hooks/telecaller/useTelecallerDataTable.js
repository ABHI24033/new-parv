// "use client";

// import api from "@/api/api";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// const pageSize = 15;

// // Fetch Telecaller List (Infinite Pagination)
// async function fetchTelecallerList({ pageParam = null, queryKey }) {
//     const [, search] = queryKey;

//     const params = {
//         pageSize,
//     };

//     if (pageParam) params.startAfterId = pageParam;
//     if (search) params.search = search;

//     try {
//         const res = await api.get("users/telecaller", { params });
//         return res.data;
//     } catch (error) {
//         console.log("Error during fetching telecaller List", error);
//         throw new Error(error.message || "Failed to fetch data");
//     }
// }

// // Fetch details by ID
// async function fetchTelecallerDetails(id) {
//     try {
//         const res = await api.get(`users/telecaller/${id}`);
//         return res.data;
//     } catch (error) {
//         console.log("Error during fetching telecaller Details", error);
//         throw new Error(error.message || "Failed to fetch details");
//     }
// }

// // ─────────────────────────────────────────
// // HOOK: List Query (Infinite Scrolling / Pagination)
// // ─────────────────────────────────────────

// export function useTelecallerList(search = "") {
//     const query = useInfiniteQuery({
//         queryKey: ["Telecaller-list", search],
//         queryFn: fetchTelecallerList,
//         getNextPageParam: (lastPage) => lastPage?.lastDocId || null,
//         initialPageParam: null,
//         staleTime: 1000 * 60 * 5,
//     });

//     // Flatten pages into a single list
//     const TelecallerData = query.data?.pages.flatMap((p) => p.data) || [];

//     return {
//         TelecallerData,
//         totalCount: query.data?.pages?.[0]?.totalCount || 0,
//         totalPages: query.data?.pages?.[0]?.totalPages || 1,
//         loadMore: query.fetchNextPage,
//         hasNextPage: query.hasNextPage,
//         isLoading: query.isLoading,
//         isFetchingNext: query.isFetchingNextPage,
//         search,
//     };
// }

// // ─────────────────────────────────────────
// // HOOK: Fetch Single Telecaller Details
// // ─────────────────────────────────────────

// export function useTelecallerDetails(id) {
//     return useQuery({
//         queryKey: ["Telecaller-details", id],
//         queryFn: () => fetchTelecallerDetails(id),
//         enabled: !!id, // only fetch when ID is ready
//         staleTime: 1000 * 60 * 10,
//     });
// }










"use client";

import api from "@/api/api";
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const pageSize = 15;

/* ─────────────────────────────
   FETCH TELECALLER LIST (INFINITE)
───────────────────────────── */
async function fetchTelecallerList({ pageParam = null, queryKey }) {
  const [, search] = queryKey;

  const params= { pageSize };
  if (pageParam) params.startAfterId = pageParam;
  if (search) params.search = search;

  const res = await api.get("users/telecaller", { params });
  return res.data;
}

/* ─────────────────────────────
   FETCH SINGLE TELECALLER
───────────────────────────── */
async function fetchTelecallerDetails(id) {
  const res = await api.get(`users/telecaller/${id}`);
  return res.data;
}

/* ─────────────────────────────
   UPDATE TELECALLER
───────────────────────────── */
async function updateTelecaller({
  id,
  payload,
}) {
  const res = await api.put(`users/telecaller/${id}`, payload);
  return res.data;
}

/* ─────────────────────────────
   SOFT DELETE TELECALLER
───────────────────────────── */
async function softDeleteTelecaller(id) {
  const res = await api.patch(`users/telecaller/soft-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HARD DELETE TELECALLER
───────────────────────────── */
async function hardDeleteTelecaller(id) {
  const res = await api.delete(`users/telecaller/hard-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HOOK: TELECALLER LIST
───────────────────────────── */
export function useTelecallerList(search = "") {
  const query = useInfiniteQuery({
    queryKey: ["telecaller-list", search],
    queryFn: fetchTelecallerList,
    getNextPageParam: (lastPage) => lastPage?.lastDocId || null,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
  });

  return {
    TelecallerData: query.data?.pages.flatMap((p) => p.data) || [],
    totalCount: query.data?.pages?.[0]?.totalCount || 0,
    totalPages: query.data?.pages?.[0]?.totalPages || 1,
    loadMore: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNext: query.isFetchingNextPage,
  };
}

/* ─────────────────────────────
   HOOK: SINGLE TELECALLER DETAILS
───────────────────────────── */
export function useTelecallerDetails(id) {
  return useQuery({
    queryKey: ["telecaller-details", id],
    queryFn: () => fetchTelecallerDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

/* ─────────────────────────────
   HOOK: UPDATE TELECALLER
───────────────────────────── */
export function useUpdateTelecaller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTelecaller,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["telecaller-list"] });
      queryClient.invalidateQueries({
        queryKey: ["telecaller-details", id],
      });
    },
  });
}

/* ─────────────────────────────
   HOOK: SOFT DELETE TELECALLER
───────────────────────────── */
export function useSoftDeleteTelecaller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteTelecaller,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telecaller-list"] });
    },
  });
}

/* ─────────────────────────────
   HOOK: HARD DELETE TELECALLER
───────────────────────────── */
export function useHardDeleteTelecaller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hardDeleteTelecaller,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telecaller-list"] });
    },
  });
}
