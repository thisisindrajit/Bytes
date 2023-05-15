import useIsInPwaMode from "@/hooks/useIsInPwaMode";
import { FC, ReactNode } from "react";

interface HolderProps {
  className?: string;
  otherStyles?: { [key: string]: any };
  children: ReactNode;
}

const Holder: FC<HolderProps> = ({ children, otherStyles, className = "" }) => {
  const { isInPwaMode } = useIsInPwaMode();

  return (
    <div
      className={`${
        isInPwaMode ? "min-h-[100vh]" : "min-h-[100dvh]"
      } h-fit w-full xl:max-w-[1440px] 2xl:max-w-[1920px] m-auto ${className}`}
      style={otherStyles}
    >
      {children}
    </div>
  );
};

export default Holder;
