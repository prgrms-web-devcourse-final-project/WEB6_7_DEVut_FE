export default async function ClientApi<T>(
  path: string,
  init: ClientApiInit = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchInit } = init;
  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1${path}${qs}`, {
    ...fetchInit,
    headers: {
      "Content-Type": "application/json",
      ...(fetchInit.headers || {}),
    },
    credentials: "include",
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorBody | null;

    // 서버가 JSON을 줬으면 그걸 throw (onError에서 err.data.password로 꺼낼 수 있게)
    if (body) throw body;

    // JSON이 아니면 텍스트라도
    const text = await res.text().catch(() => "");
    throw { msg: text || `HTTP Error: ${res.status}`, resultCode: String(res.status), data: null };
  }

  return (await res.json()) as ApiResponse<T>;
}
