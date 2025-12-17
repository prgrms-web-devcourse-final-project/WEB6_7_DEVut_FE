export interface UserSigninRequest {
  email: string;
  password: string;
}

export interface UserSigninResponse {
  resultCode: string;
  msg: string;
  data: {
    userInfo: {
      id: number;
      email: string;
      nickname: string;
      birthDate: string;
      image: null;
    };
  };
}

export interface UserRefreshResponse {
  resultCode: string;
  msg: string;
  data: {
    accessToken: string;
    expiresIn: number;
  };
}
