import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/api';
import toast from 'react-hot-toast';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data;
    },
    staleTime: 20 * 1000,
    refetchInterval: 30 * 1000,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/tasks', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Task created');
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to create task');
    }
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, data }) => {
      const res = await api.patch(`/tasks/${taskId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Task updated');
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update task');
    }
  });
};

export const useAddTaskRemark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, text }) => {
      const res = await api.patch(`/tasks/${taskId}/remarks`, { text });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Remark added');
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to add remark');
    }
  });
};

export const useUsersByRole = (role) => {
  return useQuery({
    queryKey: ['users', role],
    queryFn: async () => {
      const res = await api.get(`/users/role/${role}`);
      return res.data;
    },
    enabled: !!role,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId) => {
      const res = await api.delete(`/tasks/${taskId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Task deleted');
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to delete task');
    }
  });
};
