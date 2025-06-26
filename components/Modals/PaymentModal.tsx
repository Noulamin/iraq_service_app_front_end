import { Dialog } from "@headlessui/react";
import { NewToolsDto } from "@/types/tools/new-tools-dto";
import LoadingButton from "../LoadingButton";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import ToolLocalBankPayment from "../Payments/ToolLocalBankPayment";
import OnlinePayment from "../Payments/OnlinePayment";
import OfflinePayment from "../Payments/OfflinePayment";

type Period = "month" | "year" | "day";

interface PaymentModalProps {
  productId: number;
  productData: any;
  productType: "tool" | "pack"
  modalOpen: boolean;
  period: Period;
  setModalOpen: Function;
  onBuySuccess: Function;
}

const PaymentModal: React.FC<
  PaymentModalProps & { setModalOpen: Function; onBuySuccess: Function }
> = ({ modalOpen, setModalOpen, period, productId, productData, productType, onBuySuccess }) => {
  return (
    <Dialog
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      className="fixed top-0 left-0 z-99999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
    >
      <Dialog.Panel className="w-full max-w-[830px] h-[400px] text-center">
        <div className="relative overflow-hidden w-full h-full rounded-lg bg-white">
          <Tab.Group>
            <div
              className="absolute z-999999 top-4 right-4 cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <img src="/images/close.png" className="max-w-4" alt="close" />
            </div>
            <div className="flex bg-white w-full h-full">
              {/* Vertical Tab List */}
              <Tab.List className="flex flex-col justify-center items-center border-r-2 border-[#dcdcdc] shadow-1xl bg-[#F7FAF9] w-[25%]">
                <Tab className="flex justify-center items-center w-full h-[25%] outline-none">
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "bg-white w-[95%] h-[89%] rounded-md shadow-lg border-[2px] border-[#dcdcdc]"
                          : "w-[95%] h-[89%]"
                      }
                    >
                      <span className="w-full h-full flex justify-center items-center">
                        <img
                          src="/images/cih-bank.png"
                          className="max-w-[120px]"
                          alt="cih"
                        />
                      </span>
                    </div>
                  )}
                </Tab>
                <Tab className="flex justify-center items-center w-full h-[25%] outline-none">
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "bg-white w-[95%] h-[89%] rounded-md shadow-lg border-[2px] border-[#dcdcdc]"
                          : "w-[95%] h-[89%]"
                      }
                    >
                      <span className="w-full h-full flex justify-center items-center">
                        <img
                          src="/images/wafabank.png"
                          className="max-w-[110px]"
                          alt="wafabank"
                        />
                      </span>
                    </div>
                  )}
                </Tab>
                <Tab className="flex justify-center items-center w-full h-[25%] outline-none">
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "bg-white w-[95%] h-[89%] rounded-md shadow-lg border-[2px] border-[#dcdcdc]"
                          : "w-[95%] h-[89%]"
                      }
                    >
                      <span className="w-full h-full flex justify-center items-center">
                        <img
                          src="/images/paypal.png"
                          className="max-w-[120px]"
                          alt="paypal"
                        />
                      </span>
                    </div>
                  )}
                </Tab>
                <Tab className="flex justify-center items-center w-full h-[25%] outline-none">
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "bg-white w-[95%] h-[89%] rounded-md shadow-lg border-[2px] border-[#dcdcdc]"
                          : "w-[95%] h-[89%]"
                      }
                    >
                      <span className="w-full h-full flex justify-center items-center">
                        <img
                          src="/images/orange-money.png"
                          className="max-w-[120px]"
                          alt="orange-money"
                        />
                      </span>
                    </div>
                  )}
                </Tab>
                <Tab className="flex justify-center items-center w-full h-[25%] outline-none">
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "bg-white w-[95%] h-[89%] rounded-md shadow-lg border-[2px] border-[#dcdcdc]"
                          : "w-[95%] h-[89%]"
                      }
                    >
                      <span className="w-full h-full flex justify-center items-center">
                        <img
                          src="/images/visa-master.png"
                          className="max-w-[120px]"
                          alt="visa-master"
                        />
                      </span>
                    </div>
                  )}
                </Tab>
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="w-[75%] h-full">
                <Tab.Panel className="h-full">
                  <OfflinePayment
                    paymentMethod="cih"
                    period={period}
                    productType={productType}
                    productData={productData}
                    productId={productId}
                    setDetailsModalOpen={() => {
                      onBuySuccess("cih");
                    }}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <OfflinePayment
                    paymentMethod="tijari"
                    period={period}
                    productType={productType}
                    productData={productData}
                    productId={productId}
                    setDetailsModalOpen={() => {
                      onBuySuccess("tijari");
                    }}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full gap-2 flex flex-col justify-center items-center">
                  <img
                    src="/images/paypal.png"
                    className="max-w-[100px]"
                    alt="PAYPAL"
                  />
                  <p className="text-sm text-black">Coming Soon ...</p>
                  {/* <OnlinePayment
                    paymentMethod="paypal"
                    period={period}
                    productType={productType}
                    productData={productData}
                    productId={productId}
                  /> */}
                </Tab.Panel>
                <Tab.Panel className="h-full gap-2 flex flex-col justify-center items-center">
                  <img
                    src="/images/orange-money.png"
                    className="max-w-[100px]"
                    alt="ORANGE MONEY"
                  />
                  <p className="text-sm text-black">Coming Soon ...</p>
                </Tab.Panel>
                <Tab.Panel className="h-full gap-2 flex flex-col justify-center items-center">
                  <img
                    src="/images/visa-master.png"
                    className="max-w-[100px]"
                    alt="VISA MASTER"
                  />
                  <p className="text-sm text-black">Coming Soon ...</p>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PaymentModal;
