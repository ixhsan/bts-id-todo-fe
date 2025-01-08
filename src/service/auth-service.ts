// src/services/auth-service.ts
import { LoginRequest, RegisterRequest, LoginResponse } from "@/types/auth";
import baseApi from "./base-api";
import { BaseResponse } from "@/types/common";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await baseApi.post<BaseResponse<LoginResponse>>("/login", data);
    return response.data.data
  },

  register: async (data: RegisterRequest): Promise<null> => {
    const response = await baseApi.post<BaseResponse<null>>("/register", data);
    return response.data.data
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },
};
