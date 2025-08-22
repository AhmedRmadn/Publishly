import { toast } from "react-hot-toast";
import { updateUserProfile } from "../services/ProfileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateProfileImage,
    isPending: updatingProfile,
    error: errorProfile,
  } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profileHeader"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateProfileImage, updatingProfile, errorProfile };
}
