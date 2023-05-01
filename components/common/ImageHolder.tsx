import Image from "next/image";
import { FC, useState } from "react";
import Loading from "./Loading";

interface ImageHolderProps {
  heightAndWidthClasses: string;
  src: string;
  alt: string;
  priority?: boolean;
  showLoading?: boolean;
  loadingIconColor?: "black" | "white" | "grey";
  heightAndWidthClassesForLoadingIcon?: string;
}
const ImageHolder: FC<ImageHolderProps> = ({
  heightAndWidthClasses,
  src,
  alt,
  priority,
  showLoading = false,
  loadingIconColor,
  heightAndWidthClassesForLoadingIcon,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return showLoading ? (
    <div>
      {!isImageLoaded && (
        <Loading
          heightAndWidthClassesForLoadingIcon={
            heightAndWidthClassesForLoadingIcon
              ? heightAndWidthClassesForLoadingIcon
              : heightAndWidthClasses
          }
          color={loadingIconColor}
          noText
        />
      )}
      <div
        className={`${
          isImageLoaded ? "block" : "hidden"
        } relative ${heightAndWidthClasses}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={true}
          onLoadingComplete={() => {
            setIsImageLoaded(true);
          }}
          priority={priority}
        />
      </div>
    </div>
  ) : (
    <div className={`relative ${heightAndWidthClasses}`}>
      <Image
        src={src}
        alt={alt}
        fill={true}
        priority={priority ? priority : false}
      />
    </div>
  );
};

export default ImageHolder;
