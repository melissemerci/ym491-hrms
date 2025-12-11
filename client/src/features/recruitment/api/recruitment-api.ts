import { api } from '@/lib/api';
import { JobPosting } from '../types';

export const recruitmentApi = {
  getJob: async (id: number): Promise<JobPosting> => {
    // Using the base service API directly
    const response = await api.get<JobPosting>(`/api/base/recruitment/jobs/${id}`);
    return response as unknown as JobPosting;
  },

  getAllJobs: async (): Promise<JobPosting[]> => {
    const response = await api.get<JobPosting[]>('/api/base/recruitment/jobs');
    return response as unknown as JobPosting[];
  }
};

