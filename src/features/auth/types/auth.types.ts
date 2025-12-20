export type UserSigninRequest = {
  email: string;
  password: string;
};
export type UserSigninResponse = ApiResponse<{
  userInfo: User;
  accessToken: string;
  refreshToken: string;
}>;

export type UserSignOutResponse = ApiResponse<string>;

export type UserSignupRequest = {
  email: string;
  password: string;
  nickname: string;
  image?: string | null;
};
export type UserSignupResponse = ApiResponse<{ id: number }>;

// export type UserRefreshResponse = ApiResponse<{
//   userInfo: User;
//   accessToken: string;
//   refreshToken: string;
// }>;
