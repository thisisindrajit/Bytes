import { FC, useEffect, useState } from "react";
import Loading from "../common/Loading";
import { fetchTitleFromUrl } from "@/utilities/commonUtilities";
import ImageHolder from "../common/ImageHolder";
import { ToastContainer, toast } from "react-toastify";

interface ArticleIframeHolderProps {
  link: string;
  onClose: () => void;
  className?: string;
}

const ArticleIframeHolder: FC<ArticleIframeHolderProps> = ({
  link,
  onClose,
  className,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success("Copied link to clipboard!", {
      className: "toast-status",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    const fetchTitle = async () => {
      if (link) {
        const pageTitle = await fetchTitleFromUrl(link);
        setTitle(pageTitle);
      }
    };

    fetchTitle();
  }, [link]);

  return (
    <div>
      <ToastContainer />
      {/* Loading */}
      {isLoading ? (
        <div
          className={`w-full min-h-[calc(100dvh-3rem)] flex items-center justify-center`}
        >
          <Loading
            color="black"
            heightAndWidthClassesForLoadingIcon="h-8 w-8 lg:h-10 lg:w-10"
            loadingText="Loading article..."
            className="text-sm lg:text-base"
          />
        </div>
      ) : null}
      {/* Iframe */}
      <iframe
        src={link}
        className={`${
          isLoading
            ? "hidden"
            : `block w-full min-h-[calc(100dvh-3rem)] ${className}`
        }`}
        onLoad={() => setIsLoading(false)}
      />
      {/* Bottom bar */}
      <div className="h-12 flex items-center justify-between text-sm">
        {/* Close button */}
        <div
          className="bg-red-200 h-full w-12 flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <ImageHolder
            heightAndWidthClasses="h-5 w-5"
            src="/images/svg/close.svg"
            alt="close icon"
            priority={true}
            loadingIconColor="white"
            showLoading
          />
        </div>
        {/* Title/Link holder */}
        <div className="truncate max-w-[12rem] sm:max-w-[24rem] md:max-w-[32rem]">
          {title ? title : link}
        </div>
        {/* Copy to clipboard button */}
        <div
          className="bg-[#ecd9cb] h-full w-12 flex items-center justify-center cursor-pointer"
          onClick={copyToClipboard}
        >
          <ImageHolder
            heightAndWidthClasses="h-5 w-5"
            src="/images/svg/copy.svg"
            alt="copy icon"
            priority={true}
            loadingIconColor="black"
            showLoading
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleIframeHolder;
