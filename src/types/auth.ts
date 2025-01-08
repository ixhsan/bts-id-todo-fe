// src/types/auth.ts

export interface BaseResponse<T> {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}