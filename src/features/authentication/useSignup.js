import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  //   const queryClient = useQueryClient();
  //
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      // Redirect to the dashboard
      navigate("/dashboard", { replace: true });
      //   queryClient.setQueryData(["user"], user.user);
      toast.success("User created successfully");
    },
  });

  return { signup, isLoading };
}
