import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully check in`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkin, isChecking };
}
