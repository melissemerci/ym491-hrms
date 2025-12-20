import { useQuery } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment-api';

export const useJobApplications = (jobId: number, status?: string) => {
  return useQuery({
    queryKey: ['job-applications', jobId, status],
    queryFn: () => recruitmentApi.getJobApplications(jobId, status),
    enabled: !!jobId,
  });
};


