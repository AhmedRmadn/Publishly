import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { uploadImage as uploadImageFn } from "../services/ArticleService";

export function useUploadImage() {
  const mutation = useMutation({
    mutationFn: uploadImageFn,
    onError: (err) => {
      toast.error(err.message || "Upload failed");
    },
  });

  return {
    ImageUploading: mutation.isPending,
    uploadImageAsync: mutation.mutateAsync, // Promise-based
  };
}
