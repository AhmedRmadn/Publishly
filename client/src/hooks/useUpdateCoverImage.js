import { toast } from "react-hot-toast";
import { updateUserCover } from "../services/ProfileService";
import { useMutation } from "@tanstack/react-query";

export function useUpdateCoverImage() {
  const {
    mutateAsync: updateCoverImage,
    isPending: updatingCover,
    error: errorCover,
  } = useMutation({
    mutationFn: updateUserCover,
    onError: (err) => toast.error(err.message),
  });

  return { updateCoverImage, updatingCover, errorCover };
}
