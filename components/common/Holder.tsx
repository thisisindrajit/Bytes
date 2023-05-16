import { FC, ReactNode } from "react";

interface HolderProps {
  className?: string;
  otherStyles?: { [key: string]: any };
  children: ReactNode;
}

const Holder: FC<HolderProps> = ({ children, otherStyles, className = "" }) => {
  return (
    <div
      className={`min-h-[100svh] h-fit w-full xl:max-w-[1440px] 2xl:max-w-[1920px] m-auto ${className}`}
      style={otherStyles}
    >
      {children}
    </div>
  );
};

export default Holder;
