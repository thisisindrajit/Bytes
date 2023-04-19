import { FC, ReactNode } from "react";

interface HolderProps {
  className?: string;
  children: ReactNode;
}

const Holder: FC<HolderProps> = ({ children, className = "" }) => {
  return (
    <div
      id="test"
      className={`min-h-screen h-fit w-full xl:max-w-[1440px] 2xl:max-w-[1920px] m-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Holder;
