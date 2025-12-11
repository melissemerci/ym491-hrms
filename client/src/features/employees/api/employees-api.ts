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

  getCV: async (id: number): Promise<EmployeeCV> => {
    const response = await api.get<EmployeeCV>(`/api/io/cv/${id}`) as any;
    return response as EmployeeCV;
  },
};

export interface EmployeeCV {
  personal_info: {
    birth_date: string | null;
    gender: string | null;
    nationality: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    professional_title: string | null;
    professional_summary: string | null;
  } | null;
  addresses: {
    address_type: string;
    country: string | null;
    city: string | null;
    street: string | null;
    postal_code: string | null;
    is_current: boolean;
  }[];
  work_experience: {
    job_title: string;
    company: string;
    employment_type: string | null;
    country: string | null;
    city: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
  }[];
  education: {
    institution: string;
    degree: string | null;
    field_of_study: string | null;
    gpa: string | null;
    start_date: string | null;
    end_date: string | null;
    is_current: boolean;
    thesis: string | null;
  }[];
  technical_skills: {
    skill_name: string;
    proficiency_level: string | null;
    years_of_experience: number | null;
  }[];
  soft_skills: {
    skill_name: string;
  }[];
  languages: {
    language: string;
    proficiency: string | null;
  }[];
  certifications: {
    certification_name: string;
    issuing_organization: string | null;
    issue_date: string | null;
    expiration_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    does_not_expire: boolean;
  }[];
  projects: {
    project_name: string;
    description: string | null;
    role: string | null;
    start_date: string | null;
    end_date: string | null;
    is_current: boolean;
  }[];
}

