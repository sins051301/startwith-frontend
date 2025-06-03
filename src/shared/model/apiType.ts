export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  httpStatus: number;
  message: string;
  code: string;
}
