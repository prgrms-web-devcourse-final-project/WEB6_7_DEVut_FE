// src/features/auth/model/auth.guard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "../hooks/useMe";

//  로그인 필요한 페이지용
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      alert("로그인이 필요합니다");
      router.replace("/auth/login");
    }
  }, [isLoading, data, router]);

  if (isLoading || !data) return null;
  return <>{children}</>;
}

// 로그인 페이지 접근 차단용. 로그인 된 상태에서 못 접근하게
export function NoAuthOnly({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      alert("로그인 상태입니다");
      router.replace("/");
    }
  }, [isLoading, data, router]);

  if (isLoading) return null;
  return <>{children}</>;
}
