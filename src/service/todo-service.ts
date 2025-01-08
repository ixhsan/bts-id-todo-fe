// src/services/todo-service.ts
import baseApi from "./base-api";
import { BaseResponse } from "@/types/common";
import { Todo, TodoCreateRequest, TodoDeleteRequest } from "@/types/todo";

export const todoService = {
  index: async () => {
    const response = await baseApi.get<BaseResponse<Todo[]>>("/checklist");
    return response.data.data;
  },

  create: async (data: TodoCreateRequest): Promise<Todo> => {
    const response = await baseApi.post<BaseResponse<Todo>>("/checklist", data);
    return response.data.data;
  },

  remove: async (data: TodoDeleteRequest) => {
    const response = await baseApi.delete<BaseResponse<null>>("/checklist", {
      params: {
        id: data.id,
      },
    });
    return response.data.data;
  },
};
