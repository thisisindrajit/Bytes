import Image from "next/image";
import { FC, useState } from "react";
import Loading from "./Loading";

interface ImageHolderProps {
  heightAndWidthClasses: string;
  src: string;
  alt: string;
  priority?: boolean;
  showLoading?: boolean;
  color?: "black" | "white" | "grey";
  heightAndWidthClassesForLoadingIcon?: string;
}
const ImageHolder: FC<ImageHolderProps> = ({
  heightAndWidthClasses,
  src,
  alt,
  priority,
  showLoading = false,
  color,
  heightAndWidthClassesForLoadingIcon,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return showLoading ? (
    <div>
      {!isImageLoaded && (
        <Loading
          heightAndWidthClassesForLoadingIcon={
            heightAndWidthClassesForLoadingIcon
              ? heightAndWidthClassesForLoadingIcon
              : heightAndWidthClasses
          }
          color={color}
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
      <Image src={src} alt={alt} fill={true} priority={priority} />
    </div>
  );
};

export default ImageHolder;
