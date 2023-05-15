import { isPwa } from "@/utilities/commonUtilities";
import { useLayoutEffect, useState } from "react";

const useIsInPwaMode = () => {
  const [isInPwaMode, setIsInPwaMode] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsInPwaMode(isPwa());
  }, []);

  return { isInPwaMode };
};

export default useIsInPwaMode;
