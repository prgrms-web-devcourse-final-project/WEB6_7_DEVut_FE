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
    throw new Error(`HTTP Error: ${res.status}`);
  }
  return (await res.json()) as ApiResponse<T>;
}
