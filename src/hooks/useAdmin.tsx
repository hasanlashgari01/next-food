import { getDashboard } from "@/services/adminService";
import { useQuery } from "@tanstack/react-query";

const useGetDashboard = () =>
  useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboard,
    retry: false,
    refetchOnWindowFocus: true,
  });

export { useGetDashboard };

