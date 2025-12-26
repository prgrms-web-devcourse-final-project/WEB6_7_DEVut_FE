"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { socialLogin } from "@/features/auth/api/socialLogin.api";

export default function OAuth2SuccessPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tempToken = searchParams.get("tempToken");
    if (!tempToken) return;

    (async () => {
      await socialLogin(tempToken);
      await qc.invalidateQueries({ queryKey: ["me"] });
      router.replace("/?status=social_success");
    })();
  }, []);

  return null;
}
