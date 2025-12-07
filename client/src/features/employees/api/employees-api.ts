import { api } from '@/lib/api';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  title: string | null;
  department: string | null;
  hire_date: string | null;
  salary: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface EmployeeStatistics {
  total_employees: number;
  active_employees: number;
  inactive_employees: number;
  departments: {
    name: string;
    count: number;
  }[];
}

export const employeesApi = {
  getStatistics: async (): Promise<EmployeeStatistics> => {
    const response = await api.get<EmployeeStatistics>('/api/base/employees/statistics') as any;
    return response as EmployeeStatistics;
  },

  getAll: async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>('/api/base/employees/') as any;
    return response as Employee[];
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await api.get<Employee>(`/api/base/employees/details/${id}`) as any;
    return response as Employee;
  },
};

