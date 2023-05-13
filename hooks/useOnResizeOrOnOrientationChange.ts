import { setDocHeight } from "@/utilities/commonUtilities";
import { useEffect, useState } from "react";

const useOnResizeOrOnOrientationChange = () => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleOnResize = () => {
      setDocHeight();
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleOnResize);
    window.addEventListener("orientationchange", handleOnResize);

    return () => window.removeEventListener("resize", handleOnResize);
  }, [window.innerWidth]);

  return { innerHeight, innerWidth };
};

export default useOnResizeOrOnOrientationChange;
