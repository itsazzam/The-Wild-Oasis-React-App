import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteBooking = function () {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleteingBooking } = useMutation({
    mutationFn: (bookingId) => apiDeleteBooking(bookingId),

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("Could not delete booking");
    },
  });

  return { deleteBooking, isDeleteingBooking };
};
