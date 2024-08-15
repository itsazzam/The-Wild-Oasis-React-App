import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // Redirect to the dashboard
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user.user);

      console.log("user", user);
    },
  });

  return { login, isLoading };
}
