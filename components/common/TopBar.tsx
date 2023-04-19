import { FC } from "react";
import Image from "next/image";

interface TopBarProps {
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-white w-full flex items-center justify-between text-sm fixed drop-shadow-[0_25px_25px_rgba(188,171,138,0.2)] z-10 ${className}`}
    >
      {/* Logo and title */}
      <div className="p-4 w-fit flex items-center gap-2.5 cursor-pointer">
        <div className="relative h-4 w-4">
          <Image
            src="/images/bytes_logo.png"
            alt="bytes logo"
            fill={true}
            priority
          />
        </div>
        <span className="hidden sm:block uppercase tracking-[0.25em]">
          Bytes
        </span>
      </div>
      {/* Install button */}
      <div className="bg-[#ecd9cb] p-4 min-h-full w-fit flex items-center gap-2 cursor-pointer">
        <div className="relative h-4 w-4">
          <Image
            src="/images/svg/download.svg"
            alt="download icon"
            fill={true}
            priority
          />
        </div>
        <span className="hidden sm:block">Install</span>
      </div>
    </div>
  );
};

export default TopBar;
