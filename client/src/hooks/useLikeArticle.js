import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { userLikesArticle } from "../services/LikeSerivce";

export function UseLikeArticle({ onSuccess }) {
  const { mutateAsync: likePost, isPending: isLike } = useMutation({
    mutationFn: userLikesArticle,
    onError: (err) => toast.error(err.message),
    onSuccess, // pass state update logic from component
  });

  return { isLike, likePost };
}
