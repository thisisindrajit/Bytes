import { useEffect, useState } from "react";

const useOnResize = () => {
  const [isTopPlacement, setIsTopPlacement] = useState<boolean>(window.innerHeight <= 667 && window.innerWidth >= 1024);

  useEffect(() => {
    const handleOnResize = () => {
      setIsTopPlacement(window.innerHeight <= 667 && window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleOnResize);

    return () => window.removeEventListener("resize", handleOnResize);
  }, [window.innerWidth]);

  return { isTopPlacement };
};

export default useOnResize;
