interface ApiResponse<T> {
  resultCode: string;
  msg: string;
  data: T;
}
