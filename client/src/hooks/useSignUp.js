import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { register } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  //   const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("successful registeration");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isSigningUp, signUp };
}
