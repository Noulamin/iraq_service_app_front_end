import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchUsersList = (page: number) => async () => {
  const response = await api.post(`api/admin/get-users-list/`, { page: page });
  return response.data;
};

export const useGetUsersList = (page: number) => {
  const query = useQuery({
    queryKey: ["usersList"],
    queryFn: fetchUsersList(page),
    keepPreviousData: true,
    enabled: !!page,
  });

  return {
    ...query,
  };
};
