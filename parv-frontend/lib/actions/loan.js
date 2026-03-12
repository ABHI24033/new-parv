import api from "@/api/api";

const TYPE_TO_PATH = {
  gold: "gold",
  vehicle: "vehicle",
  personal: "personal",
  home: "home",
  business: "business",
  group: "group",
};

const normalizeType = (type = "") => String(type).trim().toLowerCase();

const resolvePathByType = (type) => TYPE_TO_PATH[normalizeType(type)] || null;

const ALL_LOAN_TYPES = Object.entries(TYPE_TO_PATH).map(([type, path]) => ({
  type,
  path,
}));

const toPascalCase = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";

const findLoanById = async (id) => {
  for (const { type, path } of ALL_LOAN_TYPES) {
    try {
      const res = await api.get(`/loans/${path}/${id}`);
      const loan = res?.data?.data;
      if (loan) {
        return {
          type,
          path,
          loan,
        };
      }
    } catch (error) {
      // Continue probing other loan collections
    }
  }

  return null;
};

export const setLoanData = async (_token, data, type) => {
  const path = resolvePathByType(type);
  if (!path) {
    return { success: false, message: `Unsupported loan type: ${type}` };
  }

  try {
    const res = await api.post(`/loans/${path}`, data);
    return { success: true, data: res?.data?.data };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to create loan",
    };
  }
};

export const getLoanData = async (
  _token,
  type,
  pageSize = 10,
  _startAfterDocId,
  page = 1
) => {
  const path = resolvePathByType(type);
  if (!path) {
    return { success: false, message: `Unsupported loan type: ${type}` };
  }

  try {
    const res = await api.get(`/loans/${path}`, {
      params: { limit: pageSize, page },
    });

    return {
      success: true,
      data: res?.data?.data || [],
      total: res?.data?.total || 0,
      page: res?.data?.page || page,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch loans",
    };
  }
};

export const getLoanByID = async (_token, id) => {
  try {
    const found = await findLoanById(id);
    if (!found) {
      return { success: false, message: "Loan not found" };
    }

    return {
      success: true,
      id: found.loan?._id || id,
      data: {
        ...found.loan,
        type: toPascalCase(found.type),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch loan",
    };
  }
};

export const setLoanByID = async (_token, id, data) => {
  try {
    let path = resolvePathByType(data?.loanType || data?.type);

    if (!path) {
      const found = await findLoanById(id);
      path = found?.path || null;
    }

    if (!path) {
      return { success: false, message: "Unable to resolve loan type" };
    }

    const res = await api.put(`/loans/${path}/${id}`, data);
    return {
      success: true,
      msg: "Loan updated successfully",
      data: res?.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update loan",
    };
  }
};

// Compatibility helpers for legacy DSA income screens.
export const saveApplicationData = async () => {
  return {
    success: false,
    message: "DSA income save endpoint is not available on backend yet.",
  };
};

export const getConnectorIncomes = async (_token, connectorId) => {
  try {
    const res = await api.get(`/users/dashboard/${connectorId}`);
    const chartData = res?.data?.data?.chartData || [];
    return { success: true, data: chartData };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to fetch connector incomes",
      data: [],
    };
  }
};
