import { FC } from "react";
import ImageHolder from "../common/ImageHolder";

interface ArticleSummaryHolderProps {
  summary: string;
  generatedByAi: boolean;
  articleUrl: string;
}

const ArticleSummaryHolder: FC<ArticleSummaryHolderProps> = ({
  summary,
  generatedByAi,
  articleUrl,
}) => {
  return (
    <div className="p-4">
      <div className="text-lg text-[#ecd9cb]">Article Summary</div>
      {/* Summary holder */}
      <div
        className={`bg-[#212121] border px-6 py-4 rounded text-base/loose my-4 ${
          generatedByAi ? "border-[#ecd9cb]" : "border-red-500"
        }`}
      >
        {summary}
        {generatedByAi && (
          <div className="text-xs mt-6 mb-2 text-[#ecd9cb]">
            Generated by AI
          </div>
        )}
      </div>
      {/* Link to read full article */}
      <div className="text-base/loose mt-4 lg:mt-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span className="mr-1 lg:mr-2">
          {generatedByAi
            ? "Want to know more?"
            : "But don't worry! We got you!"}
        </span>
        <a
          href={articleUrl}
          tabIndex={-1}
          className="hidden lg:inline text-[#ecd9cb] border border-[#ecd9cb] p-2 rounded hover:bg-[#ecd9cb] hover:text-black"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>
        <a
          href={articleUrl}
          tabIndex={-1}
          className="lg:hidden text-[#ecd9cb] no-underline hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>
        <span className="ml-1 lg:ml-2">to read the full article!</span>
      </div>
      {/* Check out article details text block */}
      <div className="text-base/loose mb-4 lg:mb-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span className="mr-2">Swipe right or click on</span>
        <div className="inline-block">
          <span className="text-sm uppercase text-[#ecd9cb]">Details</span>
          <div className="inline-block align-middle ml-2">
            <ImageHolder
              heightAndWidthClasses="h-4 w-4"
              src="/images/svg/right-arrow-cream.svg"
              alt="right arrow cream icon"
              priority={true}
              color="white"
              showLoading
            />
          </div>
        </div>
        <span className="ml-2">to view article details.</span>
      </div>
    </div>
  );
};

export default ArticleSummaryHolder;
