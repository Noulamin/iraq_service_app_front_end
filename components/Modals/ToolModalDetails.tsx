import { Dialog } from "@headlessui/react";
import { NewToolsDto } from "@/types/tools/new-tools-dto";
import LoadingButton from "../LoadingButton";
import { checkIfImageUrl } from "@/utils/imageValidator";

type Period = "month" | "year" | "day";

interface ToolModalDetailsProps {
  toolData: NewToolsDto;
  modalOpen: boolean;
  period: Period;
  setModalOpen: Function;
  setPeriod: Function;
  onBuy: Function;
}

const ToolModalDetails: React.FC<
  ToolModalDetailsProps & {
    setModalOpen: Function;
    setPeriod: Function;
    onBuy: Function;
  }
> = ({ modalOpen, setModalOpen, setPeriod, period, onBuy, toolData }) => {

  return (
    <Dialog
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
    >
      <Dialog.Panel className="w-full max-w-[830px] h-[400px] text-center dark:bg-boxdark">
        <div className="flex overflow-hidden w-full h-full rounded-lg bg-white">
          <div className="w-[50%] h-full">
            <img
              className="h-full object-cover"
              src={
                checkIfImageUrl(toolData?.tool_image)
                  ? toolData?.tool_image
                  : "/images/default_image.png"
              }
              alt="image"
            />
          </div>
          <div className="w-[50%] h-full p-7 text-start relative">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <img src="/images/close.png" className="max-w-4" alt="close" />
            </div>
            <p className="text-black text-2xl font-bold">
              {toolData?.tool_name}
            </p>
            <p className="text-[#b84230] font-bold w-full text-[17px] py-2">
              {toolData?.tool_day_price
                ? "$" + toolData?.tool_day_price + " - "
                : "$" + toolData?.tool_month_price + " - "}{" "}
              {"$" + toolData?.tool_year_price}
            </p>
            <p className="text-black font-bold w-full text-[15px] px-2 pt-2">
              You will get :
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: toolData?.tool_description }}
              className="text-black font-bold w-full h-[122px] text-[12px]"
            ></div>
            <div className="inline-flex rounded-md shadow-sm py-1" role="group">
              <button
                type="button"
                style={{
                  backgroundColor: period === "month" ? "#EEB466" : "white",
                }}
                className="px-[10px] py-[4px] text-[13px] font-medium text-black hover:bg-[#EEB466] bg-transparent border border-gray-900 rounded-s-lg"
                onClick={() => {
                  setPeriod("month");
                }}
              >
                Monthly
              </button>
              {toolData?.tool_day_price ? (
                <>
                  <button
                    type="button"
                    style={{
                      backgroundColor: period === "year" ? "#EEB466" : "white",
                    }}
                    className="px-[10px] py-[4px] text-[13px] font-medium text-black hover:bg-[#EEB466] bg-transparent border-t border-b border-gray-900"
                    onClick={() => {
                      setPeriod("year");
                    }}
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor: period === "day" ? "#EEB466" : "white",
                    }}
                    className="px-[10px] py-[4px] text-[13px] font-medium text-black hover:bg-[#EEB466] bg-transparent border border-gray-900 rounded-e-lg"
                    onClick={() => {
                      setPeriod("day");
                    }}
                  >
                    Trial 1 Day
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    style={{
                      backgroundColor: period === "year" ? "#EEB466" : "white",
                    }}
                    className="px-[10px] py-[4px] text-[13px] font-medium text-black hover:bg-[#EEB466] bg-transparent border-l-0 border border-gray-900 rounded-e-lg"
                    onClick={() => {
                      setPeriod("year");
                    }}
                  >
                    Annual
                  </button>
                </>
              )}
            </div>

            <p className="text-black text-md font-bold py-2 flex gap-1">
              <span>Total :</span>
              <span className="flex justify-center items-center gap-1">
                <span className="text-[#D07D68] text-sm line-through decoration-[#8E8E8E]">
                  {period === "month"
                    ? "$" + toolData?.tool_none_price_month
                    : null}
                  {period === "year"
                    ? "$" + toolData?.tool_none_price_year
                    : null}
                </span>
                <span className="text-[#B12704] text-[17px]">
                  {period === "day" ? "$" + toolData?.tool_day_price : null}
                  {period === "month" ? "$" + toolData?.tool_month_price : null}
                  {period === "year" ? "$" + toolData?.tool_year_price : null}
                </span>
              </span>
            </p>
            <span className="">
              <LoadingButton
                className={{
                  background: "#EEB466",
                  color: "black",
                  fontWeight: "bold",
                  width: "auto",
                  height: "35px",
                }}
                onClick={() => {
                  onBuy();
                }}
                title="Buy Now"
              />
            </span>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ToolModalDetails;
