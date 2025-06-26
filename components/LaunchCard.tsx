import { FunctionComponent } from "react";
import { NewToolsDto } from "@/types/tools/new-tools-dto";
import { fullDateTimeFormat } from "@/utils/timeFormatting";
import { checkIfImageUrl } from "@/utils/imageValidator";

interface LaunchCardProps {
  onClick: Function;
  toolData: NewToolsDto;
  endedAt: string;
  activeApp: number;
  isLoaded: boolean;
  content?: string;
}

const LaunchCard: FunctionComponent<LaunchCardProps> = ({
  toolData,
  endedAt,
  onClick,
  activeApp,
  isLoaded,
  content,
}) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="flex w-[330px] border-[1.5px] border-[#D1D5D8] relative rounded-[14px] cursor-pointer bg-white shadow-xl duration-500 hover:scale-105 hover:shadow-xl"
    >
      <img
        src={
          checkIfImageUrl(toolData?.tool_image)
            ? toolData?.tool_image
            : "/images/default_image.png"
        }
        alt="Product"
        className="h-25 w-29 object-cover rounded-l-xl"
      />
      <div className="px-4 py-3 w-full">
        <p className="text-lg font-bold text-black truncate block capitalize">
          {toolData?.tool_name}
        </p>
        <span className="text-gray-400 mr-3 text-sm">
          {content ? content : <>Ended at : {fullDateTimeFormat(endedAt)}</>}
        </span>
      </div>
      {activeApp === toolData?.tool_id && isLoaded === null && (
        <div className="absolute bottom-[13px] right-[13px] inline-block h-[1.1rem] w-[1.1rem] animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      )}

      {activeApp === toolData?.tool_id && isLoaded === true && (
        <img
          src="/images/green-check.png"
          className="max-w-[25px] absolute bottom-[10px] right-[10px]"
        />
      )}
      {activeApp === toolData?.tool_id && isLoaded === false && (
        <img
          src="/images/red-reload.png"
          className="max-w-[22px] absolute bottom-[10px] right-[10px]"
        />
      )}
    </div>
  );
};

export default LaunchCard;
