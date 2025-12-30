interface ResponseBase {
  resultCode: string;
  msg: string;
}

interface ApiResponse<T> extends ResponseBase {
  data: T;
}
type Params = Record<string, string | number | boolean | undefined>;
type ClientApiInit = RequestInit & {
  params?: Params;
};

type ApiErrorBody = { resultCode?: string; msg?: string };

type RefreshData = {
  userInfo: User;
  accessToken: string;
  refreshToken: string;
};
