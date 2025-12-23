"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function OAuth2SuccessPage() {
  const router = useRouter();
  const qc = useQueryClient();

  useEffect(() => {
    (async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
      await qc.refetchQueries({ queryKey: ["me"] });

      router.replace("/?status=social_success");
    })();
  }, [qc, router]);

  return null;
}
