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
   FETCH DSA LIST (INFINITE)
───────────────────────────── */
async function fetchDSAList({ pageParam = null, queryKey }) {
  const [, search] = queryKey;

  const params = { pageSize };
  if (pageParam) params.startAfterId = pageParam;
  if (search) params.search = search;

  const res = await api.get("users/dsa", { params });
  return res.data;
}

/* ─────────────────────────────
   FETCH SINGLE DSA
───────────────────────────── */
async function fetchDSADetails(id) {
  console.log("hello testing");

  const res = await api.get(`users/${id}`);
  return res.data;
}

/* ─────────────────────────────
   UPDATE DSA
───────────────────────────── */
async function updateDSA({
  id,
  payload,
}) {
  const res = await api.put(`users/${id}`, payload);
  return res.data;
}

/* ─────────────────────────────
   SOFT DELETE DSA
   (Deactivate / isActive=false)
───────────────────────────── */
async function softDeleteDSA(id) {
  const res = await api.patch(`users/soft-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HARD DELETE DSA
   (Permanent)
───────────────────────────── */
async function hardDeleteDSA(id) {
  const res = await api.delete(`users/hard-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HOOK: DSA LIST
───────────────────────────── */
export function useDSAList(search = "") {
  const query = useInfiniteQuery({
    queryKey: ["dsa-list", search],
    queryFn: fetchDSAList,
    getNextPageParam: (lastPage) => lastPage?.lastDocId || null,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
  });

  return {
    dsaData: query.data?.pages.flatMap((p) => p.data) || [],
    totalCount: query.data?.pages?.[0]?.totalCount || 0,
    totalPages: query.data?.pages?.[0]?.totalPages || 1,
    loadMore: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNext: query.isFetchingNextPage,
  };
}

/* ─────────────────────────────
   HOOK: SINGLE DSA DETAILS
───────────────────────────── */
export function useDSADetails(id) {
  return useQuery({
    queryKey: ["dsa-details", id],
    queryFn: () => fetchDSADetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

/* ─────────────────────────────
   HOOK: UPDATE DSA
───────────────────────────── */
export function useUpdateDSA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDSA,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["dsa-list"] });
      queryClient.invalidateQueries({ queryKey: ["dsa-details", id] });
    },
  });
}

/* ─────────────────────────────
   HOOK: SOFT DELETE DSA
───────────────────────────── */
export function useSoftDeleteDSA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteDSA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dsa-list"] });
    },
  });
}

/* ─────────────────────────────
   HOOK: HARD DELETE DSA
───────────────────────────── */
export function useHardDeleteDSA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hardDeleteDSA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dsa-list"] });
    },
  });
}

