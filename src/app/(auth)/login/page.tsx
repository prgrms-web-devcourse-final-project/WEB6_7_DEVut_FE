"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AuthForm from "@/components/auth/AuthForm";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import DashDivider from "@/components/common/DashDivider";

import kakao from "@/assets/auth/kakao.svg";
import google from "@/assets/auth/google.svg";
import BBlogoSet from "@/assets/common/BBlogoSet.svg";

import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { NoAuthOnly } from "@/features/auth/model/auth.guard";

export default function LoginPage() {
  return (
    <NoAuthOnly>
      <LoginForm />
    </NoAuthOnly>
  );
}

function LoginForm() {
  const router = useRouter();
  const signIn = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signIn.isPending) return;

    setErrorMsg(null);

    signIn.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert("로그인 성공");
          router.push("/");
        },
        onError: (error: any) => {
          const msg = error?.response?.data?.msg ?? "이메일 또는 비밀번호를 확인해주세요.";
          setErrorMsg(msg);
        },
      }
    );
  };
  return (
    <AuthForm>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 로고 */}
        <div className="flex justify-center">
          <Image
            src={BBlogoSet}
            alt="BBlogoBackground"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* 이메일 */}
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* 비밀번호 */}
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* 에러 메시지 */}
        {errorMsg && <p className="text-center text-sm text-red-600">{errorMsg}</p>}

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          disabled={signIn.isPending}
          className="bg-custom-orange drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
        >
          {signIn.isPending ? "로그인 중..." : "로그인"}
        </Button>

        <DashDivider label="또는" />

        {/* 소셜 로그인 */}
        <Button className="shadow-flat bg-yellow-300">
          <Image src={kakao} alt="kakao" className="mr-2" />
          <span>카카오 로그인</span>
        </Button>

        <Button className="shadow-flat bg-green-500">
          <span>N 네이버 로그인</span>
        </Button>

        <Button className="shadow-flat">
          <Image src={google} alt="google" className="mr-2" />
          <span>Google 로그인</span>
        </Button>

        {/* 회원가입 이동 */}
        <div className="flex justify-center">
          <span className="text-border-sub mr-2">아직 회원이 아니신가요?</span>
          <span className="cursor-pointer text-red-700" onClick={() => router.push("/signup")}>
            회원가입
          </span>
        </div>
      </form>
    </AuthForm>
  );
}
