import { apiClient } from "@/shared/api/client";

export const getPresignedUrl = async (body: GetPresignedUrlRequest): Promise<PresignedUrlData> => {
  const res = await apiClient.post<ApiResponse<PresignedUrlData>>("/api/v1/images/upload", body);

  return res.data.data;
};

export const uploadToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error("S3 이미지 업로드 실패");
  }
};
