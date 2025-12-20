"use client";

import AuthForm from "@/components/auth/AuthForm";
import BBlogoSet from "@/assets/common/BBlogoSet.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { isSamePassword, isValidEmail, isValidPassword } from "@/utils/validation";
import { NoAuthOnly } from "@/features/auth/model/auth.guard";
import { useSignUp } from "@/features/auth/hooks/useSignUp";
import DashDivider from "@/components/common/DashDivider";
import { useIssueEmailCode } from "@/features/auth/hooks/useIssueEmailCode";
import { useVerifyEmailCode } from "@/features/auth/hooks/useVerifyEmailCode";
import { formatMMSS, getRemainingSeconds } from "@/utils/getRemainingTime";

type EmailVerifyStatus =
  | "idle" // 아무것도 안 함
  | "sent" // 인증번호 발송됨
  | "verified" // 인증 완료
  | "error"; // 에러

export default function SignUpPage() {
  return (
    // <NoAuthOnly>
    <SignUpForm />
    // </NoAuthOnly>
  );
}

function SignUpForm() {
  const route = useRouter();
  const signUp = useSignUp();
  const issue = useIssueEmailCode();
  const verify = useVerifyEmailCode();

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailCodeErr, setEmailCodeErr] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<EmailVerifyStatus>("idle");

  const [remainSec, setRemainSec] = useState<number | null>(null);
  const [lockSendBtn, setLockSendBtn] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sendEmailCodeLabel =
    verifyStatus === "sent" && remainSec !== null ? "인증번호 재발급" : "인증번호 받기";

  useEffect(() => {
    if (remainSec === null) return;

    const timer = setInterval(() => {
      setRemainSec(prev => (prev === null ? null : Math.max(prev - 1, 0)));
    }, 1000);
    return () => clearInterval(timer);
  }, [remainSec]);

  const SendEmailCode = () => {
    if (issue.isPending || lockSendBtn) return;
    if (!email) {
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg("이메일 형식이 올바르지 않습니다.");
      return;
    }
    setErrorMsg(null);
    issue.mutate(
      { email },
      {
        onSettled: () => setLockSendBtn(false),
        onSuccess: res => {
          setVerifyStatus("sent");
          setEmailCodeErr(null);

          const expiresAt = res.data.expiresAt;
          const sec = getRemainingSeconds(expiresAt);
          setRemainSec(sec);
        },
        onError: (err: any) => {
          setVerifyStatus("error");
          const msg = err?.response?.data?.msg ?? "인증번호 발급에 실패했습니다.";
          setEmailCodeErr(msg);
          setRemainSec(null);
        },
      }
    );
  };

  const emailCodeMsg = (() => {
    if (verifyStatus === "verified") {
      return "이메일 인증이 완료되었습니다.";
    }

    if (verifyStatus === "sent") {
      if (remainSec === null) return null;

      if (remainSec === 0) {
        return "인증번호 유효시간이 만료되었습니다. 재발급 해주세요.";
      }

      return `인증번호가 발송되었습니다. 남은 유효 시간 ${formatMMSS(remainSec)}`;
    }

    return null;
  })();
  const VerifyEmailCode = () => {
    if (verify.isPending) return;

    setErrorMsg(null);
    verify.mutate(
      { email, code: emailCode },
      {
        onSuccess: () => {
          setVerifyStatus("verified");
          setRemainSec(null);
          setEmailCodeErr(null);
        },
        onError: () => {
          const msg = "인증번호가 일치하지 않습니다.";
          setEmailCodeErr(msg);
        },
      }
    );
  };
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUp.isPending) return;

    setErrorMsg(null);

    if (!email || !password || !passwordConfirm || !nickname) {
      setErrorMsg("모든 입력칸을 채워주세요.");
      return;
    }
    if (verifyStatus !== "verified") {
      setErrorMsg("이메일 인증을 완료해주세요.");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMsg("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }
    if (!isSamePassword(password, passwordConfirm)) {
      setErrorMsg("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    console.log({
      email,
      password,
      nickname,
    });
    signUp.mutate(
      { email, password, nickname },
      {
        onError: (err: any) => {
          const msg = err?.response?.data?.data.password ?? "회원가입에 실패했습니다.";
          setErrorMsg(msg);
        },
        onSuccess: () => {
          route.push("/login");
        },
      }
    );
  };
  return (
    <>
      <AuthForm>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Image
              src={BBlogoSet}
              alt="BBlogoBackground"
              className="cursor-pointer"
              onClick={() => route.push("/")}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={verifyStatus === "verified" || issue.isPending}
                className={
                  verifyStatus === "verified" ? "cursor-not-allowed bg-gray-300 text-gray-500" : ""
                }
              />
              <Button
                type="button"
                onClick={SendEmailCode}
                disabled={
                  issue.isPending ||
                  lockSendBtn ||
                  verify.isPending ||
                  !email ||
                  !isValidEmail(email)
                }
              >
                {sendEmailCodeLabel}
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="인증번호"
                value={emailCode}
                disabled={verifyStatus === "verified"}
                onChange={e => setEmailCode(e.target.value)}
                className={
                  verifyStatus === "verified" ? "cursor-not-allowed bg-gray-300 text-gray-500" : ""
                }
              />
              <Button
                type="button"
                onClick={VerifyEmailCode}
                disabled={
                  verifyStatus === "verified" || verify.isPending || lockSendBtn || !emailCode
                }
              >
                {verifyStatus === "verified" ? "인증완료" : "인증하기"}
              </Button>
            </div>
            {emailCodeMsg && <p className="text-center text-sm text-blue-500">{emailCodeMsg}</p>}
            {emailCodeErr && <p className="text-center text-sm text-red-500">{emailCodeErr}</p>}
          </div>

          {/* 
          비번
          */}
          <DashDivider />
          <Input
            type="text"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          {errorMsg && <p className="text-center text-sm text-red-500">{errorMsg}</p>}
          <Button
            type="submit"
            disabled={signUp.isPending}
            className="bg-custom-orange drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
          >
            {signUp.isPending ? "회원가입 중..." : "회원가입"}
          </Button>
          <div className="flex justify-center">
            <span className="text-border-sub mr-2">이미 회원이신가요?</span>
            <span className="cursor-pointer text-red-700" onClick={() => route.push("/login")}>
              로그인
            </span>
          </div>
        </form>
      </AuthForm>
    </>
  );
}
