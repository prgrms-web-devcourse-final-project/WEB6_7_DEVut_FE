interface GetPresignedUrlRequest {
  fileName: string;
  directory: string;
  fileSize: number;
}

interface PresignedUrlData {
  presignedUrl: string;
  fileUrl: string;
}
