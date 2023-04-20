import Image from "next/image";
import { FC } from "react";

interface ArticleThumbnailHolderProps {
  title: string;
  description: string | null;
  pubDate: string;
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
    const seconds = publishedObj.getSeconds();
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
      <div className="text-xs my-4 flex items-center w-fit gap-2">
        <div className="relative h-3 w-3">
          <Image
            src="/images/svg/clock.svg"
            alt="clock icon"
            fill={true}
            priority
          />
        </div>
        <span>{formatDateAndTime(pubDate)}</span>
      </div>
      {/* Horizontal separator */}
      <div className="my-4 lg:my-6 h-[1px] w-full bg-[#ecd9cb]"></div>
      {/* Description */}
      {description && (
        <div className="text-base/loose mt-2 line-clamp-[8]">{description}</div>
      )}
      {/* Check out AI summary text block */}
      <div className="text-base/loose mt-4 lg:mt-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span>Click on</span>
        <div className="inline-block mx-2">
          <span className="text-sm uppercase text-[#ecd9cb]">
            Summary by AI
          </span>
          <div className="inline-block relative h-4 w-4 align-middle ml-2">
            <Image
              src="/images/svg/right-arrow-cream.svg"
              alt="right arrow cream icon"
              fill={true}
              priority
            />
          </div>
        </div>
        <span>to read the AI generated summary for the article.</span>
      </div>
      {/* How to read full article text block */}
      <div className="text-base/loose mb-4 lg:mb-6 border-l border-[#ecd9cb] w-fit px-4 py-1">
        <span>Click on</span>
        <div className="inline-block mx-2">
          <div className="inline-block relative h-4 w-4 align-middle">
            <Image
              src="/images/svg/link-cream.svg"
              alt="link cream icon"
              fill={true}
              priority
            />
          </div>
        </div>
        <span>in the bottom bar to read the full article.</span>
      </div>
    </div>
  );
};

export default ArticleThumbnailHolder;
