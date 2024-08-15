import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newValues, id }) => createEditCabin(newValues, id),
    onSuccess: () => {
      queryClient.invalidateQueries("cabins");
      toast.success("Cabin Edited!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
