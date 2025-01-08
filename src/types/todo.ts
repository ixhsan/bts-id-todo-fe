// src/types/todo.ts

export type TodoItem = {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
};

export type Todo = {
  id: number;
  checklistCompletionStatus: boolean;
  name: string;
  item: TodoItem[] | null;
};

export interface TodoCreateRequest {
  name: string;
}

export interface TodoDeleteRequest {
  id: number;
}
