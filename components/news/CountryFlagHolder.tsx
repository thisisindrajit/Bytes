import { FC, useState } from "react";
import Image from "next/image";

interface CountryFlagHolderProps {
  url: string;
  alt: string;
}

const CountryFlagHolder: FC<CountryFlagHolderProps> = ({ url, alt }) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleError = () => {
    setIsError(true);
  };

  return !isError ? (
    <div className="relative min-h-[1rem] min-w-[1rem] h-4 w-4">
      <Image src={url} alt={alt} onError={handleError} fill={true} />
    </div>
  ) : null;
};

export default CountryFlagHolder;
