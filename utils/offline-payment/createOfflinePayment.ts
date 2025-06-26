import { NewOfflinePayment } from "@/types/offline-payment/new-offline-payment-dto";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export async function createPayment(data: NewOfflinePayment) {
  const response = await api.post("/api/payment/offline-payment", data);
  return response.data;
}

export const useOfflinePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewOfflinePayment) => {
      return createPayment(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["offline-payment"]);
    },
  });
};
