import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { login } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn, isPending: isSigning } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // ✅ Store token in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type || "Bearer");

      // invalidate cached profile (so it refetches with new token)
      queryClient.invalidateQueries(["userProfile"]);

      toast.success("Successful login");
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isSigning, signIn };
}
