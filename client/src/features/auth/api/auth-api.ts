import { api } from '@/lib/api';
import { LoginInput, RegisterInput, TokenResponse, User } from '../schemas';

export const authApi = {
  login: async (data: LoginInput): Promise<TokenResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);

    const response = await api.post<{ access_token: string }>('/base/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.access_token;
  },

  register: async (data: RegisterInput): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/base/register', {
        email: data.email,
        password: data.password,
        full_name: data.full_name
    });
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/base/users/me');
    return response.data;
  },
};

