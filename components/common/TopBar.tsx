import { FC } from "react";
import Image from "next/image";

interface TopBarProps {
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-[#ecd9cb]/80 backdrop-blur-xl w-full flex items-center justify-between text-sm fixed drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] z-10 ${className}`}
    >
      {/* Logo and title */}
      <div className="p-4 w-fit flex items-center gap-2.5 cursor-pointer">
        <div className="relative h-5 w-5">
          <Image
            src="/images/bytes_logo.png"
            alt="bytes logo"
            fill={true}
            priority
          />
        </div>
        <span className="tracking-[0.1em]">
          Bytes
        </span>
      </div>
      {/* Install button */}
      <div className="bg-[#ecd9cb] p-4 min-h-full w-fit flex items-center gap-2 cursor-pointer">
        <div className="relative h-5 w-5 sm:h-4 sm:w-4">
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
