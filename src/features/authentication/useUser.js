import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user: data,
    isLoading,
    isAuthenticated: data?.role === "authenticated",
  };
}
