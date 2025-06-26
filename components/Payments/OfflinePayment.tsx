import { FunctionComponent, useEffect, useState } from "react";
import LoadingButton from "../LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToolErrorModal from "../Modals/ToolErrorModal";
import { NewOfflinePayment } from "@/types/offline-payment/new-offline-payment-dto";
import { useOfflinePayment } from "@/utils/offline-payment/createOfflinePayment";
import ProductDetail from "../ProductDetail";

const OfflinePayment: FunctionComponent<NewOfflinePayment> = ({
  period,
  productId,
  paymentMethod,
  productType,
  productData,
  setDetailsModalOpen,
}) => {
  const [openErrorModal, setIsOpenErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const {
    mutate: OfflinePayment,
    isLoading: isPaying,
    isSuccess,
    isError,
    error,
  } = useOfflinePayment();

  const requiredMessage = "This field is required.";

  useEffect(() => {
    if (isError) {
      setErrorMessage(
        "You already ordered the same product !!, Wait for the order to be approved or contact us to accelerate the process."
      );
      setIsOpenErrorModal(true);
    }
  }, [isError]);

  const formik = useFormik({
    initialValues: {
      userFullName: "",
    },
    validationSchema: Yup.object({
      userFullName: Yup.string().required(requiredMessage),
    }),
    onSubmit: (values: NewOfflinePayment) => {
      values.period = period;
      values.paymentMethod = paymentMethod;
      values.productType = productType;
      values.productId = productId;
      OfflinePayment(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setDetailsModalOpen(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="w-full h-full gap-3 flex flex-col justify-center items-center relative">
        <ProductDetail productType={productType} productData={productData} period={period} currency="MAD" />

        <img
          src={paymentMethod === "cih" ? "/images/cih-bank.png" : paymentMethod === "tijari" && "/images/wafabank.png"}
          className="max-h-[40px]"
          alt="CIH BANK"
        />
        <input
          type="text"
          name="userFullName"
          id="userFullName"
          placeholder={paymentMethod === "cih" ? "Your CIH Bank account name" : paymentMethod === "tijari" && "Your Attijariwafa Bank account name"
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.userFullName && formik.errors.userFullName ? (
          <p className="text-danger text-sm">
            {formik.errors.userFullName}
          </p>
        ) : null}

        <span>
          <p className="text-black text-sm">
            Make your payment directly into our bank account.
          </p>
          <p className="text-black text-sm">
            After placing an order you will see the account number.
          </p>
        </span>

        <form noValidate onSubmit={formik.handleSubmit}>
          <LoadingButton
            isDisabled={isPaying}
            title="Place Order"
            isLoading={isPaying}
            className={{ width: "auto" }}
            loadingPaddingX={28.5}
            onClick={() => { }}
          />
        </form>

        <p className="absolute text-danger text-sm bottom-5">
          *Please ensure that the name you provide matches the name on your bank
          account.
        </p>
      </div>

      <ToolErrorModal
        title="FAILED TO ORDER"
        message={errorMessage}
        modalOpen={openErrorModal}
        setModalOpen={setIsOpenErrorModal}
      />
    </>
  );
};

export default OfflinePayment;
