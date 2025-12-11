import { useQuery } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment-api';

export const useJob = (id: number) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => recruitmentApi.getJob(id),
    enabled: !!id,
    retry: false,
  });
};

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => recruitmentApi.getAllJobs(),
  });
};

