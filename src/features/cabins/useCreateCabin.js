import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries("cabins");
      toast.success("Cabin created");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    createCabin,
    isCreating,
  };
}

export default useCreateCabin;
