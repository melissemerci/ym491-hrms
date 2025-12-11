import { useQuery } from '@tanstack/react-query';
import { employeesApi } from '../api/employees-api';

export const useEmployeeStatistics = () => {
  return useQuery({
    queryKey: ['employees', 'statistics'],
    queryFn: employeesApi.getStatistics,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees', 'list'],
    queryFn: employeesApi.getAll,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: ['employees', 'detail', id],
    queryFn: () => employeesApi.getById(id),
    enabled: !!id,
  });
};

