import { Dialog } from "@headlessui/react";
import { NewToolsDto } from "@/types/tools/new-tools-dto";

type Period = "month" | "year" | "day";

interface CihBankOrderDetailsInfoModalProps {
  toolData: NewToolsDto;
  modalOpen: boolean;
  period: Period;
  setModalOpen: Function;
}

const CihBankOrderDetailsInfoModal: React.FC<
  CihBankOrderDetailsInfoModalProps
> = ({ modalOpen, setModalOpen, period, toolData }) => {
  return (
    <Dialog
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
    >
      <Dialog.Panel className="w-full max-w-[830px] h-[400px] text-center dark:bg-boxdark">
        <div className="flex justify-center items-center overflow-hidden w-full h-full rounded-lg bg-white relative">
          <div
            className="absolute z-999999 top-4 right-4 cursor-pointer"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <img src="/images/close.png" className="max-w-4" alt="close" />
          </div>

          <div
            className="px-4 py-2 text-start text-sm font-bold text-[#1f9c4d] absolute top-5 rounded-lg border-2 border-[#1f9c4d] bg-[#ebffef]"
            role="alert"
          >
            Thank you. Your order has been submitted.
          </div>

          <div className="w-full flex items-start flex-col px-8 text-black">
            <p className="font-bold">Our bank details :</p>
            <p>Send the amount to activate your order.</p>
            <div
              className="w-full my-2 flex justify-between px-6 py-4 text-start text-sm text-[#1E429F] rounded-lg border-1 border-[#1E429F] bg-[#EBF5FF]"
              role="alert"
            >
              <div>
                <p>BANK :</p>
                <p className="font-bold mt-1">CIH BANK</p>
              </div>
              <div>
                <p>ACCOUNT NUMBER :</p>
                <p className="font-bold mt-1">6242893211013900</p>
              </div>
              <div>
                <p>ACCOUNT NAME :</p>
                <p className="font-bold mt-1">AISSAM IKINE</p>
              </div>
              <div>
                <p>BIC :</p>
                <p className="font-bold mt-1">CIHMMAMC</p>
              </div>
            </div>

            <p className="font-bold">Order details :</p>
            <div
              className="w-full my-2 px-6 py-4 text-start text-sm text-[#1E429F] rounded-lg border-1 border-[#1E429F] bg-[#EBF5FF]"
              role="alert"
            >
              <div>
                <span className="font-bold">Product : </span>{" "}
                {period === "month"
                  ? " 1 month of " + toolData?.tool_name + "."
                  : null}
                {period === "year"
                  ? " 1 year of " + toolData?.tool_name + "."
                  : null}
                {period === "day"
                  ? " 1 day of " + toolData?.tool_name + "."
                  : null}
              </div>

              <div className="mt-1">
                <span className="font-bold">Total : </span>{" "}
                {period === "month"
                  ? toolData?.tool_month_price * 10 + " MAD"
                  : null}
                {period === "year"
                  ? toolData?.tool_year_price * 10 + " MAD"
                  : null}
                {period === "day"
                  ? toolData?.tool_day_price * 10 + " MAD"
                  : null}
              </div>
            </div>
          </div>
          <p className="absolute has-tooltip bottom-4 text-black-2 flex cursor-pointer justify-center items-center gap-1">
            if you want to accelerate the process, Contact us on{" "}
            <span className="text-[#1f9c4d] font-bold">WhatsApp</span>
            <img
              className="max-w-[18px]"
              src="/images/whatsapp.png"
              alt="whatsapp"
            />
            <span className="tooltip rounded p-1 bg-black text-white -mt-[55px]">
              +212681812440
            </span>
          </p>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default CihBankOrderDetailsInfoModal;
