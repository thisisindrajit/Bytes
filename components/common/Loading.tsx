import { FC } from "react";
import ImageHolder from "./ImageHolder";

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
  const getSrcBasedOnColor = (color: "black" | "white" | "grey") => {
    switch (color) {
      case "black":
        return "/images/svg/loading-black.svg";
      case "white":
        return "/images/svg/loading-white.svg";
      case "grey":
        return "/images/svg/loading-grey.svg";
      default:
        return "/images/svg/loading.svg";
    }
  };

  return (
    <div
      className={`flex gap-4 items-center justify-center w-fit ${className}`}
    >
      <ImageHolder
        heightAndWidthClasses={heightAndWidthClassesForLoadingIcon}
        src={color ? getSrcBasedOnColor(color) : "/images/svg/loading.svg"}
        alt="Loading icon"
        priority={true}
      />
      {!noText && <span>{loadingText ? loadingText : "Loading..."}</span>}
    </div>
  );
};

export default Loading;
