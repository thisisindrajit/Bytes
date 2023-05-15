import { FC } from "react";
import ImageHolder from "../common/ImageHolder";
import Loading from "../common/Loading";
import { showInView } from "@/utilities/articleUtilites";
import useIsInPwaMode from "@/hooks/useIsInPwaMode";

interface BottomBarProps {
  className?: string;
  link: string;
  hasPrevious: boolean;
  hasNext: boolean;
  prevId: string | null;
  nextId: string | null;
  tabIndex: number;
  isFetchingNewArticles: boolean;
}

const BottomBar: FC<BottomBarProps> = ({
  className = "",
  hasPrevious,
  hasNext,
  prevId,
  nextId,
  link,
  tabIndex,
  isFetchingNewArticles,
}) => {
  const { isInPwaMode } = useIsInPwaMode();

  return (
    <div
      className={`grid grid-cols-3 place-content-stretch w-full md:w-[32rem] m-auto rounded overflow-hidden ${className}`}
    >
      <div
        className={`${
          hasPrevious ? "bg-white cursor-pointer" : "bg-gray-200 text-gray-500"
        }  p-3 flex items-center justify-center gap-3`}
        onClick={hasPrevious && prevId ? () => showInView(prevId) : () => {}}
      >
        <ImageHolder
          heightAndWidthClasses="h-5 w-5"
          src={
            hasPrevious
              ? "/images/svg/up-arrow.svg"
              : "/images/svg/up-arrow-greyed.svg"
          }
          alt="up arrow icon"
          loadingIconColor={hasPrevious ? "black" : "grey"}
          priority={true}
          showLoading
        />
        <span className="hidden sm:block">Previous</span>
      </div>
      <div
        className={`${
          hasNext ? "bg-white cursor-pointer" : "bg-gray-200"
        } p-3 flex items-center justify-center gap-3`}
        onClick={hasNext && nextId ? () => showInView(nextId) : () => {}}
      >
        {hasNext || !isFetchingNewArticles ? (
          <>
            <ImageHolder
              heightAndWidthClasses="h-5 w-5"
              src={
                hasNext
                  ? "/images/svg/down-arrow.svg"
                  : "/images/svg/down-arrow-greyed.svg"
              }
              alt="down arrow icon"
              loadingIconColor={hasNext ? "black" : "grey"}
              priority={true}
              showLoading
            />
            <span
              className={`hidden sm:block ${
                hasNext ? "text-black" : "text-gray-500"
              }`}
            >
              Next
            </span>
          </>
        ) : (
          <Loading
            heightAndWidthClassesForLoadingIcon="h-5 w-5 sm:h-6 sm:w-6"
            color="grey"
            noText
          />
        )}
      </div>
      <a
        href={link}
        tabIndex={tabIndex}
        target={isInPwaMode ? "_self" : "_blank"}
        className="bg-[#ecd9cb] p-3 flex items-center justify-center"
        rel="noopener noreferrer"
      >
        <ImageHolder
          heightAndWidthClasses="h-5 w-5"
          src="/images/svg/link.svg"
          alt="link icon"
          loadingIconColor="black"
          priority={true}
          showLoading
        />
      </a>
    </div>
  );
};

export default BottomBar;
