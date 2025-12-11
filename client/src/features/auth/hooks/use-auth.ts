import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';
import { LoginInput, RegisterInput } from '../schemas';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  
  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (token) => {
      // Store token in cookie (expires in 7 days)
      Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
      
      // Invalidate user query to refetch user data
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      
      // Redirect to the original page or dashboard
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // You can add toast notification here
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (token) => {
      // Store token in cookie (expires in 7 days)
      Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
      
      // Invalidate user query to refetch user data
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: authApi.me,
    retry: false,
    enabled: !!Cookies.get('token'), // Only fetch if token exists
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear token from cookie
      Cookies.remove('token');
      
      // Clear user query cache
      queryClient.setQueryData(['user', 'me'], null);
      queryClient.clear();
    },
    onSuccess: () => {
      router.push('/login');
    },
  });
};


