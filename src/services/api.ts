import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiError } from '../types';

class Api {
  private static instance: Api;
  private api: AxiosInstance;
  private baseURL: string;

  private constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message,
          code: error.code || 'UNKNOWN_ERROR',
          status: error.response?.status || 500,
        };

        // Handle token expiration
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }

        return Promise.reject(apiError);
      }
    );
  }

  // Generic request method with retry logic
  private async request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    retries = 3
  ): Promise<T> {
    try {
      const response = await this.api.request<T>({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error) {
      if (retries > 0 && (error as ApiError).status >= 500) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.request<T>(method, url, data, retries - 1);
      }
      throw error;
    }
  }

  // Public methods
  public async get<T>(url: string): Promise<T> {
    return this.request<T>('get', url);
  }

  public async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>('post', url, data);
  }

  public async put<T>(url: string, data: any): Promise<T> {
    return this.request<T>('put', url, data);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.request<T>('delete', url);
  }
}

export const api = Api.getInstance();
export default api; 