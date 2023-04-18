import { FC } from "react";
import Image from "next/image";

interface TopBarProps {
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ className }) => {
  return (
    <div
      className={`bg-white/75 backdrop-blur-lg w-full flex items-center justify-between text-sm fixed p-4 ${className}`}
    >
      {/* Logo and title */}
      <div className="w-fit flex items-center gap-2.5 cursor-pointer">
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
      <div className="rounded w-fit flex items-center gap-2 cursor-pointer">
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
