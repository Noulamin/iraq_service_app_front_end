import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewPacksReqDto } from "@/types/packs/new-packs-req-dto";

const UpdatePack = async (data: NewPacksReqDto) => {
  const response = await api.post(`api/admin/update-pack/`, data);
  return response.data;
};

export const useUpdatePack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdatePack,
    onSuccess: () => {
      queryClient.invalidateQueries(["packs"]);
    },
  });
};
