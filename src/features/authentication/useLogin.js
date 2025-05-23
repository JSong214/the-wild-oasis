import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: userLogin, isLoading: isLogin } = useMutation({
    // mutationFn: (loginInfo) => login(loginInfo),
    mutationFn: login,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },

    onError: () => {
      toast.error("The username or password is incorrect.");
    },
  });

  return { userLogin, isLogin };
}
