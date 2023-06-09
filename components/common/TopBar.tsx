import { FC } from "react";
import ImageHolder from "./ImageHolder";
import InstallButton from "./InstallButton";
import Link from "next/link";

interface TopBarProps {
  className?: string;
  onClickIcon?: () => void;
}

const TopBar: FC<TopBarProps> = ({ className = "", onClickIcon }) => {
  return (
    <>
      {/* Uncomment this after pull down to refresh is implemented */}
      {/* <div
        className={`bg-[#ecd9cb]/80 backdrop-blur-xl w-full flex items-center justify-between text-sm sticky top-0 drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] z-20 ${className}`}
      > */}
      <div
        className={`bg-[#ecd9cb]/80 backdrop-blur-xl w-full flex items-center justify-between text-sm fixed drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] z-20 ${className}`}
      >
        {/* Logo and title */}
        <div
          className="bg-white p-4 w-fit flex items-center gap-2.5 cursor-pointer"
          onClick={onClickIcon}
        >
          <ImageHolder
            heightAndWidthClasses="h-4 w-4"
            src="/images/bytes_logo.png"
            alt="Bytes logo"
            priority={true}
            loadingIconColor="black"
            showLoading
          />
          <span className="tracking-[0.1em]">Bytes</span>
        </div>
        {/* Product hunt embed, info button and install button */}
        <div className="flex items-center">
          <a
            href="https://www.producthunt.com/posts/bytes-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bytes&#0045;2"
            target="_blank"
            className="mx-2 hidden sm:block"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=394870&theme=light"
              alt="Bytes - News&#0044;&#0032;redefined&#0046; | Product Hunt"
              style={{ width: "175px" }}
            />
          </a>
          <div className="flex">
            {/* Info button */}
            <Link
              scroll={false}
              href={`/?info=true`}
              className="bg-white p-[18px] sm:p-4 w-fit flex items-center gap-2"
            >
              <ImageHolder
                heightAndWidthClasses="h-4 w-4"
                src="/images/svg/info.svg"
                alt="info icon"
                priority={true}
                loadingIconColor="black"
                showLoading
              />
              <span className="hidden sm:block">Info</span>
            </Link>
            {/* Install button */}
            <InstallButton>
              <div className="bg-[#ecd9cb] p-[18px] sm:p-4 w-fit flex items-center gap-2 cursor-pointer">
                <ImageHolder
                  heightAndWidthClasses="h-4 w-4"
                  src="/images/svg/download.svg"
                  alt="download icon"
                  priority={true}
                  loadingIconColor="black"
                  showLoading
                />
                <span className="hidden sm:block">Install</span>
              </div>
            </InstallButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
