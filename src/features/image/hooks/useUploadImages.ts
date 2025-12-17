import { useState } from "react";
import { getPresignedUrl, uploadToS3 } from "../api/image.api";

export const useUploadImages = () => {
  const [isUploading, setIsUploading] = useState(false);
  const uploadImages = async (files: File[], directory: string): Promise<string[]> => {
    if (files.length === 0) return [];

    setIsUploading(true);

    try {
      const fileUrls: string[] = [];
      
      for (const file of files) {
        const { presignedUrl, fileUrl } = await getPresignedUrl({
          fileName: file.name,
          fileSize: file.size,
          directory,
        });

        await uploadToS3(presignedUrl, file);

        fileUrls.push(fileUrl);
      }

      return fileUrls;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImages, isUploading };
};
