import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettings() {
  const { data: settings, isLoading: isSettingLoading } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });

  return { settings, isSettingLoading };
}
