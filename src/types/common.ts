export interface BaseResponse<T> {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: T;
}
