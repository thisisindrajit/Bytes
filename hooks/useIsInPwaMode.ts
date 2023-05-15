import { isPwa } from "@/utilities/commonUtilities";
import { useLayoutEffect, useState } from "react";

const useIsInPwaMode = () => {
  const [isInPwaMode, setIsInPwaMode] = useState<boolean>(true);

  useLayoutEffect(() => {
    setIsInPwaMode(isPwa());
  }, []);

  return { isInPwaMode };
};

export default useIsInPwaMode;
