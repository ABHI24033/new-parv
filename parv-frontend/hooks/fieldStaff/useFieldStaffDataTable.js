// "use client";

// import api from "@/api/api";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// const pageSize = 15;

// // Fetch FieldStaff List (Infinite Pagination)
// async function fetchFieldStaffList({ pageParam = null, queryKey }) {
//     const [, search] = queryKey;

//     const params = {
//         pageSize,
//     };

//     if (pageParam) params.startAfterId = pageParam;
//     if (search) params.search = search;

//     try {
//         const res = await api.get("users/field-staff", { params });
//         return res.data;
//     } catch (error) {
//         console.log("Error during fetching FieldStaff List", error);
//         throw new Error(error.message || "Failed to fetch data");
//     }
// }

// // Fetch details by ID
// async function fetchFieldStaffDetails(id) {
//     try {
//         const res = await api.get(`users/field-staff/${id}`);
//         return res.data;
//     } catch (error) {
//         console.log("Error during fetching FieldStaff Details", error);
//         throw new Error(error.message || "Failed to fetch details");
//     }
// }

// // ─────────────────────────────────────────
// // HOOK: List Query (Infinite Scrolling / Pagination)
// // ─────────────────────────────────────────

// export function useFieldStaffList(search = "") {
//     const query = useInfiniteQuery({
//         queryKey: ["FieldStaff-list", search],
//         queryFn: fetchFieldStaffList,
//         getNextPageParam: (lastPage) => lastPage?.lastDocId || null,
//         initialPageParam: null,
//         staleTime: 1000 * 60 * 5,
//     });

//     // Flatten pages into a single list
//     const FieldStaffData = query.data?.pages.flatMap((p) => p.data) || [];

//     return {
//         FieldStaffData,
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
// // HOOK: Fetch Single FieldStaff Details
// // ─────────────────────────────────────────

// export function useFieldStaffDetails(id) {
//     return useQuery({
//         queryKey: ["FieldStaff-details", id],
//         queryFn: () => fetchFieldStaffDetails(id),
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
   FETCH FIELD STAFF LIST (INFINITE)
───────────────────────────── */
async function fetchFieldStaffList({ pageParam = null, queryKey }) {
  const [, search] = queryKey;

  const params = { pageSize };
  if (pageParam) params.startAfterId = pageParam;
  if (search) params.search = search;

  const res = await api.get("users/field-staff", { params });
  return res.data;
}

/* ─────────────────────────────
   FETCH SINGLE FIELD STAFF
───────────────────────────── */
async function fetchFieldStaffDetails(id) {
  const res = await api.get(`users/field-staff/${id}`);
  return res.data;
}

/* ─────────────────────────────
   UPDATE FIELD STAFF
───────────────────────────── */
async function updateFieldStaff({
  id,
  payload,
}) {
  const res = await api.put(`users/field-staff/${id}`, payload);
  return res.data;
}

/* ─────────────────────────────
   SOFT DELETE FIELD STAFF
───────────────────────────── */
async function softDeleteFieldStaff(id) {
  const res = await api.patch(`users/field-staff/soft-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HARD DELETE FIELD STAFF
───────────────────────────── */
async function hardDeleteFieldStaff(id) {
  const res = await api.delete(`users/field-staff/hard-delete/${id}`);
  return res.data;
}

/* ─────────────────────────────
   HOOK: FIELD STAFF LIST
───────────────────────────── */
export function useFieldStaffList(search = "") {
  const query = useInfiniteQuery({
    queryKey: ["fieldstaff-list", search],
    queryFn: fetchFieldStaffList,
    getNextPageParam: (lastPage) => lastPage?.lastDocId || null,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
  });

  return {
    FieldStaffData: query.data?.pages.flatMap((p) => p.data) || [],
    totalCount: query.data?.pages?.[0]?.totalCount || 0,
    totalPages: query.data?.pages?.[0]?.totalPages || 1,
    loadMore: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNext: query.isFetchingNextPage,
  };
}

/* ─────────────────────────────
   HOOK: SINGLE FIELD STAFF DETAILS
───────────────────────────── */
export function useFieldStaffDetails(id) {
  return useQuery({
    queryKey: ["fieldstaff-details", id],
    queryFn: () => fetchFieldStaffDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

/* ─────────────────────────────
   HOOK: UPDATE FIELD STAFF
───────────────────────────── */
export function useUpdateFieldStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFieldStaff,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["fieldstaff-list"] });
      queryClient.invalidateQueries({
        queryKey: ["fieldstaff-details", id],
      });
    },
  });
}

/* ─────────────────────────────
   HOOK: SOFT DELETE FIELD STAFF
───────────────────────────── */
export function useSoftDeleteFieldStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteFieldStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldstaff-list"] });
    },
  });
}

/* ─────────────────────────────
   HOOK: HARD DELETE FIELD STAFF
───────────────────────────── */
export function useHardDeleteFieldStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hardDeleteFieldStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldstaff-list"] });
    },
  });
}
