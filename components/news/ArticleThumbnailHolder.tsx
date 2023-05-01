import { FC } from "react";
import ImageHolder from "../common/ImageHolder";
import { formatCountry, formatDateAndTime } from "@/utilities/articleHolderUtilities";

interface ArticleThumbnailHolderProps {
  title: string;
  description: string | null;
  country: string | null;
  pubDate: string | null;
}

const ArticleThumbnailHolder: FC<ArticleThumbnailHolderProps> = ({
  title,
  description,
  country,
  pubDate,
}) => {
  return (
    <div className="p-4">
      {/* Title */}
      <div className="text-2xl/relaxed lg:text-3xl/relaxed font-bold first-letter:capitalize">
        {title}
      </div>
      {/* Country */}
      {country && formatCountry(JSON.parse(country).country) && (
        <div className="text-sm/relaxed my-3">
          <span className="flex items-center gap-2 text-[#ecd9cb]">
            {formatCountry(JSON.parse(country).country)}
          </span>
        </div>
      )}
      {/* Pub date */}
      {pubDate && (
        <div className="text-xs/relaxed mt-4 mb-6 lg:my-4 flex items-center w-fit gap-2">
          <ImageHolder
            heightAndWidthClasses="h-3 w-3"
            src="/images/svg/clock.svg"
            alt="clock icon"
            priority={true}
            loadingIconColor="white"
            showLoading
          />
          <span>{formatDateAndTime(pubDate)}</span>
        </div>
      )}
      {/* Horizontal separator */}
      <div className="my-4 lg:my-6 h-[1px] w-full bg-[#ecd9cb]"></div>
      {/* Description */}
      {description && (
        <div className="text-base/loose mt-2 line-clamp-[6]">{description}</div>
      )}
      {/* Check out AI summary text block */}
      <div className="text-base/loose mt-4 lg:mt-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span>Swipe right or click on</span>
        <span className="inline mx-1.5 text-sm uppercase text-[#ecd9cb] underline decoration-dotted underline-offset-4">
          Summary by AI
        </span>
        <span>to read the AI generated summary for the article.</span>
      </div>
      {/* How to read full article text block */}
      <div className="text-base/loose mb-4 lg:mb-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span>Click on</span>
        <div className="inline mx-1.5">
          <div className="inline-block align-middle">
            <ImageHolder
              heightAndWidthClasses="h-4 w-4"
              src="/images/svg/link-cream.svg"
              alt="link cream icon"
              priority={true}
              showLoading
            />
          </div>
        </div>
        <span>in the bottom navigation bar to read the full article!</span>
      </div>
    </div>
  );
};

export default ArticleThumbnailHolder;
