import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signOut, isLoading: isSigningOut } = useMutation({
    // No API needed – just clear localStorage
    mutationFn: async () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
    },
    onSuccess: () => {
      toast.success("Successfully logged out");
      queryClient.invalidateQueries(["profileHeader"]);
      queryClient.clear(); // clear all cached queries on logout
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.message || "Logout failed");
    },
  });

  return { isSigningOut, signOut };
}
