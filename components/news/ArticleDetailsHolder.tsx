import { FC } from "react";

interface ArticleDetailsHolderProps {
  category: string[];
  creator: string[] | null;
  source: string;
  country: string[];
  keywords: string[] | null;
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
      {/* Category */}
      <div className="mt-6 mb-8 flex flex-col gap-2">
        <div className="text-sm uppercase">Category</div>
        <div className="text-base/relaxed text-[#ecd9cb]">
          {category.join(", ")}
        </div>
      </div>
      {/* Creator */}
      {creator && (
        <div className="my-8 flex flex-col gap-2">
          <div className="text-sm uppercase">Creator</div>
          <div className="text-base/relaxed text-[#ecd9cb]">
            {creator.join(", ")}
          </div>
        </div>
      )}
      {/* Source */}
      <div className="my-8 flex flex-col gap-2">
        <div className="text-sm uppercase">Source</div>
        <div className="text-base/relaxed text-[#ecd9cb]">{source}</div>
      </div>
      {/* Country */}
      <div className="my-8 flex flex-col gap-2">
        <div className="text-sm uppercase">Country</div>
        <div className="text-base/relaxed text-[#ecd9cb]">
          {country.join(", ")}
        </div>
      </div>
      {/* Keywords */}
      {keywords && (
        <div className="my-8 flex flex-col gap-2">
          <div className="text-sm uppercase">Keywords</div>
          <div className="text-base/relaxed text-[#ecd9cb]">
            {keywords.join(", ")}
          </div>
        </div>
      )}
      {/* Details provided by text block */}
      <div className="text-base/loose my-4 lg:my-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span>Details provided by</span>
        <a
          href="https://newsdata.io/"
          tabIndex={-1}
          className="text-[#ecd9cb] mx-1 no-underline hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          newsdata.io
        </a>
        <span>API</span>
      </div>
    </div>
  );
};

export default ArticleDetailsHolder;
