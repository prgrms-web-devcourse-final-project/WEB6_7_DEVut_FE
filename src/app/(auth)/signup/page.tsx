"use client";

import AuthForm from "@/components/auth/AuthForm";
import BBlogoSet from "@/assets/common/BBlogoSet.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useState } from "react";
import {
  isSamePassword,
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "@/utils/validation";
import DashDivider from "@/components/common/DashDivider";

export default function SignUpPage() {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!email || !password || !passwordConfirm || !nickname || !phone) {
      setError("모든 입력칸을 채워주세요.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (!isSamePassword(password, passwordConfirm)) {
      setError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      setError("전화번호 형식이 올바르지 않습니다.");
      return;
    }

    setError(null);

    console.log({
      email,
      password,
      nickname,
      phone,
    });
  };
  return (
    <>
      <AuthForm>
        <div className="flex justify-center">
          <Image
            src={BBlogoSet}
            alt="BBlogoBackground"
            className="cursor-pointer justify-center"
            onClick={() => route.push("/")}
          />
        </div>
        <Input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} />
        <Input type="text" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
        <Input
          type="text"
          placeholder="비밀번호 확인"
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <div className="px-2">
          <DashDivider />
        </div>
        <Input type="text" placeholder="닉네임" onChange={e => setNickname(e.target.value)} />
        <Input type="number" placeholder="전화번호" onChange={e => setPhone(e.target.value)} />
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <Button
          onClick={handleSubmit}
          className="bg-custom-orange drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
        >
          회원가입
        </Button>
        <div className="flex justify-center">
          <span className="text-border-sub mr-2">이미 회원이신가요?</span>
          <span className="cursor-pointer text-red-700" onClick={() => route.push("/login")}>
            로그인
          </span>
        </div>
      </AuthForm>
    </>
  );
}
