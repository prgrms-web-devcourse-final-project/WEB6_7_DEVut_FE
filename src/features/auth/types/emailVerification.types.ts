export type IssueEmailCodeRequest = {
  email: string;
};

export type IssueEmailCodeResponse = {
  data: {
    remainingSeconds: number;
    expiresAt: string;
  };
};

export type VerifyEmailCodeRequest = {
  email: string;
  code: string;
};

export type VerifyEmailCodeResponse = ApiResponse<null>;
