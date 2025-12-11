import { api } from '@/lib/api';
import { LoginInput, RegisterInput, User } from '../schemas';

export const authApi = {
  login: async (data: LoginInput): Promise<string> => {
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);

    const response = await api.post<{ access_token: string }>('/api/base/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }) as any;

    return response.access_token;
  },

  register: async (data: RegisterInput): Promise<string> => {
    const response = await api.post<{ access_token: string }>('/api/base/auth/register', {
        email: data.email,
        password: data.password,
        full_name: data.full_name
    }) as any;
    return response.access_token;
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/api/base/auth/me') as any;
    return response as User;
  },
};

