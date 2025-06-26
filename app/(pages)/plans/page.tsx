"use client";

import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import PackCard from "@/components/PackCard";
import ModalPayment from "@/components/Modals/PaymentModal";
import CihBankOrderDetailsInfoModalPlans from "@/components/Modals/CihBankOrderDetailsInfoModalForPlans";
import TijariOrderDetailsInfoModalPlans from "@/components/Modals/TijariBankOrderDetailsInfoModalForPlans";

type Props = {
  params: { clientId: string };
};

const PlansPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, isLoading, isFetching, isError, refetch } = useMyInfo();

  const [openCihDetailsModal, setOpenCihDetailsModal] =
    useState<boolean>(false);
  const [openTijariDetailsModal, setOpenTijariDetailsModal] =
    useState<boolean>(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [packDetails, setPackDetails] = useState<any>();

  useEffect(() => {
    document.title = 'Plans & Pricing';
  }, [])

  return (
    <>
      <h2 className="text-title-sm2 px-3 pb-7 font-bold text-black dark:text-white">
        Plans & Pricing
      </h2>

      <div className="w-full h-full flex justify-center gap-5 pt-3">
        {
          data && data?.packsData?.map((item: any, index: number) =>
            <PackCard
              key={index}
              packTitle="What’s Inside:"
              title={item.pack_name}
              packPrice={item.pack_price}
              packData={item}
              toolsData={data?.toolsData}
              onClick={() => {
                setPackDetails(item);
                setOpenPaymentModal(true);
              }}
            />
          )
        }
      </div>

      {/* <PlanModalPayment
        modalOpen={openPaymentModal}
        setModalOpen={setOpenPaymentModal}
        amount={amound}
        plan={plan}
        onBuySuccess={(localBank: string) => {
          setOpenPaymentModal(false);
          if (localBank === "cih") {
            setOpenCihDetailsModal(true);
          } else {
            setOpenTijariDetailsModal(true);
          }
        }}
      /> */}

      <ModalPayment
        modalOpen={openPaymentModal}
        setModalOpen={setOpenPaymentModal}
        productId={packDetails?.pack_id}
        productData={packDetails}
        productType="pack"
        period={"month"}
        onBuySuccess={(bankName: "cih" | "tijari") => {
          setOpenPaymentModal(false);
          if (bankName === "cih") {
            setOpenCihDetailsModal(true);
          } else {
            setOpenTijariDetailsModal(true);
          }
        }}
      />

      <CihBankOrderDetailsInfoModalPlans
        modalOpen={openCihDetailsModal}
        setModalOpen={setOpenCihDetailsModal}
        packDetails={packDetails}
      />

      <TijariOrderDetailsInfoModalPlans
        modalOpen={openTijariDetailsModal}
        setModalOpen={setOpenTijariDetailsModal}
        packDetails={packDetails}
      />
    </>
  );
};

export default PlansPage;
