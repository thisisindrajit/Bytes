import { setDocHeight } from "@/utilities/commonUtilities";
import { useLayoutEffect, useState } from "react";

const useOnResizeOrOnOrientationChange = () => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    const handleOnResize = () => {
      setDocHeight();
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleOnResize);
    window.addEventListener("orientationchange", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
      window.removeEventListener("orientationchange", handleOnResize);
    };
  }, []);

  return { innerHeight, innerWidth };
};

export default useOnResizeOrOnOrientationChange;
