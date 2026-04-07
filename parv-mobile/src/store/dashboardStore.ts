import { create } from 'zustand';
import api from '../utils/api';

interface DashboardStats {
  totalAmount: number;
  totalApplications: number;
  leads: {
    total: number;
    bySource: Record<string, number>;
  };
  users: {
    total: number;
    byRole: Record<string, number>;
  };
  recentApplications: Array<{
    id: string;
    applicantName: string;
    loanId: string;
    loanType: string;
    loanAmount: number;
    status: string;
  }>;
  monthly: Array<{
    month: string;
    amount: number;
    applications: number;
  }>;
  typeWise: Record<string, { count: number; amount: number }>;
}

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/loans/dashboard/stats');
      set({ stats: response.data?.data || null, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Error fetching stats', isLoading: false });
    }
  },
}));
