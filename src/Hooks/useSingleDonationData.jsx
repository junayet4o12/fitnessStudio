import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useSingleDonationData = (id) => {
    const axiosPublic = useAxiosPublic()
    const { data: donationData  = {},refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
          const response = await axiosPublic.get(`/help/${id}`);
          return response.data;
        }
      })
      return [donationData,refetch]
};

export default useSingleDonationData;