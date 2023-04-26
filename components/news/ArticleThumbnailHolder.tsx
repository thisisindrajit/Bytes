import { FC } from "react";
import ImageHolder from "../common/ImageHolder";

interface ArticleThumbnailHolderProps {
  title: string;
  description: string | null;
  pubDate: string | null;
}

const ArticleThumbnailHolder: FC<ArticleThumbnailHolderProps> = ({
  title,
  description,
  pubDate,
}) => {
  const formatDateAndTime = (inputDate: string) => {
    const publishedObj = new Date(inputDate);

    const date = publishedObj.getDate();
    const month = publishedObj.getMonth() + 1;
    const year = publishedObj.getFullYear();

    const hours =
      publishedObj.getHours() > 12
        ? publishedObj.getHours() - 12
        : publishedObj.getHours() === 0
        ? 12
        : publishedObj.getHours();
    const minutes =
      publishedObj.getMinutes() < 10
        ? "0" + publishedObj.getMinutes()
        : publishedObj.getMinutes();
    const seconds =
      publishedObj.getSeconds() < 10
        ? "0" + publishedObj.getSeconds()
        : publishedObj.getSeconds();
    const amOrPm = publishedObj.getHours() >= 12 ? "PM" : "AM";

    let fullDate = `${date}/${month}/${year}`;

    return `${fullDate} AT ${hours}:${minutes}:${seconds} ${amOrPm} (GMT)`;
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div className="text-2xl/relaxed lg:text-3xl/relaxed font-bold line-clamp-4">
        {title}
      </div>
      {/* Pub date */}
      {pubDate && (
        <div className="text-xs my-4 flex items-center w-fit gap-2">
          <ImageHolder
            heightAndWidthClasses="h-3 w-3"
            src="/images/svg/clock.svg"
            alt="clock icon"
            priority={true}
            color="white"
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
        <span className="mr-2">Swipe right or click on</span>
        <div className="inline-block">
          <span className="text-sm uppercase text-[#ecd9cb]">
            Summary by AI
          </span>
          <div className="inline-block align-middle ml-2">
            <ImageHolder
              heightAndWidthClasses="h-4 w-4"
              src="/images/svg/right-arrow-cream.svg"
              alt="right arrow cream icon"
              priority={true}
              showLoading
            />
          </div>
        </div>
        <span className="ml-2">
          to read the AI generated summary for the article.
        </span>
      </div>
      {/* How to read full article text block */}
      <div className="text-base/loose mb-4 lg:mb-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span className="mr-2">Click on</span>
        <div className="inline-block">
          <div className="inline-block align-middle">
            <ImageHolder
              heightAndWidthClasses=" h-4 w-4"
              src="/images/svg/link-cream.svg"
              alt="link cream icon"
              priority={true}
              showLoading
            />
          </div>
        </div>
        <span className="ml-2">
          in the bottom navigation bar to read the full article!
        </span>
      </div>
    </div>
  );
};

export default ArticleThumbnailHolder;
