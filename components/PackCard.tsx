import { FunctionComponent } from "react";
import LoadingButton from "./LoadingButton";

interface PackCardProps {
  onClick: Function;
  title: string;
  packTitle: string;
  packPrice: number;
  packData: any;
  toolsData: any;
}

const PackCard: FunctionComponent<PackCardProps> = ({
  title,
  packTitle,
  packPrice,
  packData,
  toolsData,
  onClick,
}) => {

  function getToolNameById(toolId) {
    const tool = toolsData.find(t => t.tool_id === toolId);
    return tool ? tool.tool_name : false;
  }

  return (
    <div className="w-[300px] min-h-[500px] font-extrabold text-black p-8 bg-white border-[#D1D5D8] border-[1.5px] rounded-xl shadow-2xl">
      <p className="text-[21px] pb-4">{title}</p>
      <div className="flex pb-6">
        <div className="text-[34px]">${packPrice}</div>
        <div className="h-[30px] flex flex-col justify-between">
          <div></div>
          <p className="text-[15px] px-1 font-semibold">monthly</p>
        </div>
      </div>
      <LoadingButton
        className={{ background: packPrice == 0 ? "linear-gradient(135deg, #5D4157 0%, #A8CABA 100%)" : "#52B799", borderRadius: "6px" }}
        title={packPrice == 0 ? "Try It Now" : "Subscribe"}
        onClick={() => {
          onClick();
        }}
      ></LoadingButton>

      {packPrice == 0 ?
        <>
          <p className="text-[10px] py-[4px] font-bold">
            Ending on 13/01/2025
          </p>
          <p className="text-[17px] pb-[4px] pt-[5px] font-semibold">
            {packTitle}
          </p>
        </>
        :
        <p className="text-[17px] pb-[4px] pt-[20px] font-semibold">
          {packTitle}
        </p>
      }
      {JSON.parse(packData.pack_tools)?.map((item: any, index: number) =>
        <div className="flex items-center" style={{ display: getToolNameById(item) ? "flex" : "none" }} key={index}>
          <img
            className="h-4"
            src="images/checking-mark.png"
            alt="check-icon"
          />
          <p className="px-2 text-[14px] font-semibold text-[#6e6f73]">
            {getToolNameById(item)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PackCard;
