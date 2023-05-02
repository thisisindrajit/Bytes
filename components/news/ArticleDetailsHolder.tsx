import { checkIfArrayIsNotEmpty } from "@/utilities/articleHolderUtilities";
import { FC } from "react";

interface ArticleDetailsHolderProps {
  category: string | null;
  creator: string | null;
  source: string | null;
  country: string | null;
  keywords: string | null;
}

const ArticleDetailsHolder: FC<ArticleDetailsHolderProps> = ({
  category,
  creator,
  source,
  country,
  keywords,
}) => {
  return (
    <div className="p-4">
      <div className="text-lg text-[#ecd9cb]">Article details</div>
      {/* Horizontal separator */}
      <div className="my-4 h-[1px] w-full bg-white"></div>
      {!category && !creator && !source && !country && !keywords ? (
        <div className="text-red-500">
          No details available for this article!
        </div>
      ) : (
        <>
          {/* Category */}
          {category &&
            checkIfArrayIsNotEmpty(JSON.parse(category).category) && (
              <div className="mt-6 mb-8 flex flex-col gap-2">
                <div className="text-sm uppercase">Category</div>
                <div className="text-base/relaxed capitalize text-[#ecd9cb]">
                  {JSON.parse(category).category.join(", ")}
                </div>
              </div>
            )}
          {/* Creator */}
          {creator && checkIfArrayIsNotEmpty(JSON.parse(creator).creator) && (
            <div className="my-8 flex flex-col gap-2">
              <div className="text-sm uppercase">Creator</div>
              <div className="text-base/relaxed capitalize text-[#ecd9cb]">
                {JSON.parse(creator).creator.join(", ")}
              </div>
            </div>
          )}
          {/* Source */}
          {source && source.trim().length > 0 && (
            <div className="my-8 flex flex-col gap-2">
              <div className="text-sm uppercase">Source</div>
              <div className="text-base/relaxed text-[#ecd9cb]">{source}</div>
            </div>
          )}
          {/* Country */}
          {country && checkIfArrayIsNotEmpty(JSON.parse(country).country) && (
            <div className="my-8 flex flex-col gap-2">
              <div className="text-sm uppercase">Country</div>
              <div className="text-base/relaxed text-[#ecd9cb]">
                {JSON.parse(country).country.join(", ")}
              </div>
            </div>
          )}
          {/* Keywords */}
          {keywords &&
            checkIfArrayIsNotEmpty(JSON.parse(keywords).keywords) && (
              <div className="my-8 flex flex-col gap-2">
                <div className="text-sm uppercase">Keywords</div>
                <div className="text-base/relaxed text-[#ecd9cb]">
                  {JSON.parse(keywords).keywords.join(", ")}
                </div>
              </div>
            )}
          {/* Details provided by text block */}
          <div className="text-base/loose my-4 lg:my-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
            <span>Details provided by</span>
            <a
              href="https://newsdata.io/"
              tabIndex={-1}
              className="text-[#ecd9cb] inline mx-1.5 no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              newsdata.io
            </a>
            <span>API</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleDetailsHolder;
