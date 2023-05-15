import { isPwa } from "@/utilities/commonUtilities";
import { useEffect, useState } from "react";

const useIsInPwaMode = () => {
  const [isInPwaMode, setIsInPwaMode] = useState<boolean | null>(null);

  useEffect(() => {
    setIsInPwaMode(isPwa());
  }, []);

  return { isInPwaMode };
};

export default useIsInPwaMode;
