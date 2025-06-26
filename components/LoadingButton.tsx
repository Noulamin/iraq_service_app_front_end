import { FunctionComponent } from "react";

interface LoadingButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  title: string;
  className?: object;
  onClick: Function;
  loadingPaddingX?: number;
}

const LoadingButton: FunctionComponent<LoadingButtonProps> = ({
  isLoading,
  isDisabled,
  title,
  className,
  onClick,
  loadingPaddingX,
}) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      onClick={() => {
        onClick();
      }}
      style={className}
      className="w-full h-[40px] text-white bg-[#1A56DB] hover:bg-[#1E429F] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 flex justify-center items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {isLoading ? (
        <div
          style={{
            marginRight: loadingPaddingX ? loadingPaddingX : 0,
            marginLeft: loadingPaddingX ? loadingPaddingX : 0,
          }}
          className="inline-block h-[1.1rem] w-[1.1rem] animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        ></div>
      ) : (
        title
      )}
    </button>
  );
};

export default LoadingButton;
