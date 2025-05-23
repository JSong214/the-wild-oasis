import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettingMutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings Update successfully");
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSettingMutate, isUpdating };
}
