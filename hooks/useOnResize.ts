import { useEffect, useState } from "react";

const useResize = () => {
  const [isTopPlacement, setIsTopPlacement] = useState<boolean>(window.innerHeight <= 667 && window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsTopPlacement(window.innerHeight <= 667 && window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return { isTopPlacement };
};

export default useResize;
