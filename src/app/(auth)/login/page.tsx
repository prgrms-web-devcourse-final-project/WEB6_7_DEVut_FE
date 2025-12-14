"use client";

import AuthForm from "@/components/auth/AuthForm";
import kakao from "@/assets/auth/kakao.svg";
import google from "@/assets/auth/google.svg";
import BBlogoSet from "@/assets/common/BBlogoSet.svg";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import DashDivider from "@/components/common/DashDivider";

export default function LoginPage() {
  const route = useRouter();

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
        <Input type="email" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Button className="bg-custom-orange drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">로그인</Button>
        <DashDivider label="또는" />
        <Button className="shadow-flat bg-yellow-300">
          <Image src={kakao} alt="kakao" className="mr-2" />
          <span>카카오 로그인</span>
        </Button>
        <Button className="shadow-flat">
          <Image src={google} alt="google" className="mr-2" />
          <span>Google 로그인</span>
        </Button>
        <div className="flex justify-center">
          <span className="text-border-sub mr-2">아직 회원이 아니신가요?</span>
          <span className="cursor-pointer text-red-700" onClick={() => route.push("/signup")}>
            회원가입
          </span>
        </div>
      </AuthForm>
    </>
  );
}
