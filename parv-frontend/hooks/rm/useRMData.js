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
   FETCH RM LIST (INFINITE)
───────────────────────────── */
async function fetchRMList({ pageParam = null, queryKey }) {
  const [, search] = queryKey;

  const params= { pageSize };
  if (pageParam) params.startAfterId = pageParam;
  if (search) params.search = search;

  const res = await api.get("users/rm", { params });
  return res.data;
}

/* ─────────────────────────────
   FETCH SINGLE RM
───────────────────────────── */
async function fetchRMDetails(id) {
  const res = await api.get(`users/${id}`);
  return res.data;
}

/* ─────────────────────────────
   UPDATE RM
───────────────────────────── */
async function updateRM({
  id,
  payload,
}) {
  const res = await api.put(`users/${id}`, payload);
  return res.data;
}

/* ─────────────────────────────
   SOFT DELETE RM
───────────────────────────── */
async function softDeleteRM(id) {
  const res = await api.patch(`users/soft-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HARD DELETE RM
───────────────────────────── */
async function hardDeleteRM(id) {
  const res = await api.delete(`users/hard-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HOOK: RM LIST
───────────────────────────── */
export function useRMList(search = "") {
  const query = useInfiniteQuery({
    queryKey: ["rm-list", search],
    queryFn: fetchRMList,
    getNextPageParam: (lastPage) => lastPage?.lastDocId || null,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
  });

  return {
    RMData: query.data?.pages.flatMap((p) => p.data) || [],
    totalCount: query.data?.pages?.[0]?.totalCount || 0,
    totalPages: query.data?.pages?.[0]?.totalPages || 1,
    loadMore: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNext: query.isFetchingNextPage,
  };
}

/* ─────────────────────────────
   HOOK: SINGLE RM DETAILS
───────────────────────────── */
export function useRMDetails(id) {
  return useQuery({
    queryKey: ["rm-details", id],
    queryFn: () => fetchRMDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

/* ─────────────────────────────
   HOOK: UPDATE RM
───────────────────────────── */
export function useUpdateRM() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRM,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["rm-list"] });
      queryClient.invalidateQueries({ queryKey: ["rm-details", id] });
    },
  });
}

/* ─────────────────────────────
   HOOK: SOFT DELETE RM
───────────────────────────── */
export function useSoftDeleteRM() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteRM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rm-list"] });
    },
  });
}

/* ─────────────────────────────
   HOOK: HARD DELETE RM
───────────────────────────── */
export function useHardDeleteRM() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hardDeleteRM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rm-list"] });
    },
  });
}
