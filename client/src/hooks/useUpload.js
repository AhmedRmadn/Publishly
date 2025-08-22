import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { upload as uploadFn } from "../services/ArticleService";
import { useNavigate } from "react-router-dom";

export function useUpload() {
  const navigate = useNavigate();
  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadFn,
    onSuccess: () => {
      toast.success("Upload complete!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message || "Upload failed");
    },
  });

  return { isUploading, upload };
}
