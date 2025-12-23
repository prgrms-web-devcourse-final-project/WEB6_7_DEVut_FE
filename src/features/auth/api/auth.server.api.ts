import { ServerApi } from "@/lib/serverApi";

function isSuccess(resultCode: string) {
  return resultCode === "OK" || resultCode === "SUCCESS" || resultCode === "200";
}

function assertSuccess<T>(res: ApiResponse<T>) {
  if (!isSuccess(res.resultCode)) {
    throw new Error(res.msg || "요청에 실패했습니다.");
  }
  return res;
}

export async function getMeServer(): Promise<User | null> {
  try {
    const res = await ServerApi<User>("/users/me", {
      method: "GET",
      cache: "no-store",
    });
    assertSuccess(res);

    return res.data;
  } catch (e: unknown) {
    const msg = String(e instanceof Error ? e.message : "");
    if (msg.includes("HTTP Error: 401")) return null;
    throw e;
  }
}
