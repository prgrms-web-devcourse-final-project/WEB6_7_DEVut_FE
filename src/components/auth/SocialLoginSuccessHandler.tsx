"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Toast from "@/components/common/Toast";

export default function SocialLoginSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "social_success") {
      Toast({ message: "소셜 로그인 성공!", type: "SUCCESS" });
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}
