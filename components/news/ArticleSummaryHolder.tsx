import { FC } from "react";
import ImageHolder from "../common/ImageHolder";

interface ArticleSummaryHolderProps {
  source: string | null;
  summary: string;
  generatedByAi: boolean;
  articleUrl: string;
}

const ArticleSummaryHolder: FC<ArticleSummaryHolderProps> = ({
  source,
  summary,
  generatedByAi,
  articleUrl,
}) => {
  return (
    <div className="p-4">
      <div className="text-lg text-[#ecd9cb]">Article Summary</div>
      {/* Summary holder */}
      <div
        className={`bg-[#212121] border px-6 py-4 rounded text-base/loose text-justify first-letter:capitalize my-4 ${
          generatedByAi ? "border-[#ecd9cb]" : "border-red-500"
        }`}
      >
        {summary}
        <div className="text-xs/loose mt-8 mb-2 text-[#ecd9cb] flex flex-col gap-1 md:flex-row md:gap-0 md:items-center md:justify-between">
          {generatedByAi && <div>Generated by AI</div>}
          {source && (
            <div
              className={`text-white truncate md:max-w-[28rem] ${
                generatedByAi ? "" : "m-auto mr-0"
              }`}
            >
              Article source: {source}
            </div>
          )}
        </div>
      </div>
      {/* Info block */}
      <div className="flex flex-col gap-2 text-base/loose my-4 lg:my-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        {/* Link to read full article */}
        <div>
          <span>
            {generatedByAi
              ? "Want to know more?"
              : "But don't worry! We got you!"}
          </span>
          {/* In large screens, style like a button */}
          <a
            href={articleUrl}
            tabIndex={-1}
            className="hidden lg:inline mx-1.5 text-[#ecd9cb] border border-[#ecd9cb] p-2 rounded hover:bg-[#ecd9cb] hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here
          </a>
          {/* In small screens, style like a normal link */}
          <a
            href={articleUrl}
            tabIndex={-1}
            className="lg:hidden inline mx-1.5 text-[#ecd9cb] no-underline hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here
          </a>
          <span>to read the full article!</span>
        </div>
        {/* Check out article details text block */}
        <div>
          <span>Click on</span>
          <span className="inline mx-1.5 text-sm uppercase text-[#ecd9cb] underline decoration-dotted underline-offset-4">
            Details
          </span>
          <span>to view details of the article.</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleSummaryHolder;
