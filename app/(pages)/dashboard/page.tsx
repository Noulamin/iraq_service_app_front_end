"use client";
import CardItem from "@/components/CardItem";
import { FunctionComponent, useEffect, useState } from "react";

import { NewToolsDto } from "@/types/tools/new-tools-dto";
import ToolModalDetails from "@/components/Modals/ToolModalDetails";
import ModalPayment from "@/components/Modals/PaymentModal";
import CihBankOrderDetailsInfoModal from "@/components/Modals/CihBankOrderDetailsInfoModal";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import TijariBankOrderDetailsInfoModal from "@/components/Modals/TijariBankOrderDetailsInfoModal";
type Period = "month" | "year" | "day";

const Dashboard: FunctionComponent = () => {
  const { data } = useMyInfo();

  const [toolsData, setToolsData] = useState(global.globalToolsData);
  const [toolData, setToolData] = useState<NewToolsDto>(null);
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [openCihDetailsModal, setOpenCihDetailsModal] =
    useState<boolean>(false);
  const [openTijariDetailsModal, setOpenTijariDetailsModal] =
    useState<boolean>(false);
  const [period, setPeriod] = useState<Period>("month");

  const shuffleArray = async (array: any) => {
    let data = array;
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
  };

  if (data && !toolsData && !global.shuffleArray) {
    if (!global.shuffleArray) {
      const shuffleNow = async () => {
        let shuffledData = await shuffleArray(data.toolsData);
        global.globalToolsData = shuffledData;
        setToolsData(shuffledData);
      };
      shuffleNow();
      global.shuffleArray = true;
    }
  }

  useEffect(() => {
    document.title = 'Toolz & Apps';
    if (global.shuffleArray) {
      setToolsData(global.globalToolsData);
    }
  }, []);

  return (
    <>
      <h2 className="text-title-sm2 px-3 pb-7 font-bold text-black dark:text-white">
        Dashboard
      </h2>

      <div className="grid w-full gap-10 justify-center px-5" style={{ gridTemplateColumns: "repeat(auto-fit, 240px)" }}>
        {data &&
          toolsData?.map((item: NewToolsDto, index: number) => (
            <CardItem
              onClick={() => {
                setPeriod("month");
                setToolData(item);
                setOpenDetailModal(true);
              }}
              key={index}
              toolData={item}
            />
          ))}
      </div>

      {/* <DataStatsThree /> */}

      <ToolModalDetails
        modalOpen={openDetailModal}
        setModalOpen={setOpenDetailModal}
        toolData={toolData}
        onBuy={() => {
          setOpenDetailModal(false);
          setOpenPaymentModal(true);
        }}
        period={period}
        setPeriod={setPeriod}
      />

      <ModalPayment
        modalOpen={openPaymentModal}
        setModalOpen={setOpenPaymentModal}
        productId={toolData?.tool_id}
        productData={toolData}
        productType="tool"
        period={period}
        onBuySuccess={(bankName: "cih" | "tijari") => {
          setOpenPaymentModal(false);
          if (bankName === "cih") {
            setOpenCihDetailsModal(true);
          } else {
            setOpenTijariDetailsModal(true);
          }
        }}
      />

      <CihBankOrderDetailsInfoModal
        modalOpen={openCihDetailsModal}
        setModalOpen={setOpenCihDetailsModal}
        toolData={toolData}
        period={period}
      />

      <TijariBankOrderDetailsInfoModal
        modalOpen={openTijariDetailsModal}
        setModalOpen={setOpenTijariDetailsModal}
        toolData={toolData}
        period={period}
      />
    </>
  );
};

export default Dashboard;
