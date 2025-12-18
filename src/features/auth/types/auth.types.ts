export type UserSigninRequest = {
  email: string;
  password: string;
};
export type UserSigninResponse = ApiResponse<{ userInfo: User }>;

export type UserSignupRequest = {
  email: string;
  password: string;
  nickname: string;
};
export type UserSignupResponse = ApiResponse<{ id: number }>;

export type UserRefreshResponse = ApiResponse<{ accessToken: string; expiresIn: number }>;
