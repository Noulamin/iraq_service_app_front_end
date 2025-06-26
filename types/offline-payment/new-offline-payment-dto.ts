export type NewOfflinePayment = {
  period?: "month" | "year" | "day";
  paymentMethod?: "cih" | "tijari";
  productType?: "tool" | "pack";
  productId?: number;
  productData?: any;
  userFullName?: string
  setDetailsModalOpen?: Function;
};