import { FC } from "react";
import ImageHolder from "./ImageHolder";
import { getLoadingIconSrcBasedOnColor } from "@/utilities/commonUtilities";

interface LoadingProps {
  heightAndWidthClassesForLoadingIcon: string;
  className?: string;
  color?: "black" | "white" | "grey";
  loadingText?: string;
  noText?: boolean;
}

const Loading: FC<LoadingProps> = ({
  heightAndWidthClassesForLoadingIcon,
  className = "",
  color,
  loadingText,
  noText,
}) => {
  return (
    <div
      className={`flex gap-4 items-center justify-center w-fit ${className}`}
    >
      <ImageHolder
        heightAndWidthClasses={heightAndWidthClassesForLoadingIcon}
        src={color ? getLoadingIconSrcBasedOnColor(color) : "/images/svg/loading.svg"}
        alt="Loading icon"
        priority={true}
      />
      {!noText && <span>{loadingText ? loadingText : "Loading..."}</span>}
    </div>
  );
};

export default Loading;
