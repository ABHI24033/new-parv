import api from "@/api/api";

/**
 * Fetch loans for a specific DSA/Connector
 * @param {string} _token - Auth token (handled automatically by api interceptor)
 * @param {string} username - DSA username to filter by
 * @param {number} pageSize - Number of records per page
 * @param {string} startAfterDocId - Cursor for pagination
 * @param {number} currentPage - Page number
 */
export const getLoanDataByType = async (_token, username, pageSize = 5, startAfterDocId = null, currentPage = 1) => {
  try {
    const res = await api.get("/users/loans", {
      params: {
        username,
        pageSize,
        startAfterDocId,
        currentPage,
      },
    });

    return {
      success: true,
      data: res.data?.data || [],
      lastDocId: res.data?.lastDocId || null,
      hasMore: res.data?.hasMore || false,
      totalPages: res.data?.totalPages || 0,
      totalCount: res.data?.totalCount || 0,
    };
  } catch (error) {
    console.error("Error fetching DSA loans:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch loans",
    };
  }
};
