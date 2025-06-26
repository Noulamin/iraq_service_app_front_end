import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewPacksReqDto } from "@/types/packs/new-packs-req-dto";

export async function createPack(data: NewPacksReqDto) {
  const response = await api.post("/api/admin/create-pack/", data);
  return response.data;
}

export const useCreatePack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewPacksReqDto) => {
      return createPack(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["packs"]);
    },
  });
};
