import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useDailyActivities = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const {
      data: weight = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["user_goal"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/user_goal/${user?.email}`);
        return res.data;
      },
    });
    return [weight, isLoading, refetch]
};

export default useDailyActivities;