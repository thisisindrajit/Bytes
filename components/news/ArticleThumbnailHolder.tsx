import { FC } from "react";
import ImageHolder from "../common/ImageHolder";

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

  const formatCountry = (inputCountries: string[]) => {
    if (inputCountries.length === 0) return null;

    if (inputCountries.length > 1) {
      return (
        <>
          <span>🌏</span>
          <span>{inputCountries.join(", ")}</span>
        </>
      );
    }

    const country = inputCountries[0];

    switch (country) {
      case "india":
        return (
          <>
            <span>🇮🇳</span>
            <span>India</span>
          </>
        );
      case "united states of america":
        return (
          <>
            <span>🇺🇸</span>
            <span>United States of America</span>
          </>
        );
      case "australia":
        return (
          <>
            <span>🇦🇺</span>
            <span>Australia</span>
          </>
        );
      case "united kingdom":
        return (
          <>
            <span>🇬🇧</span>
            <span>United Kingdom</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div className="text-2xl/relaxed lg:text-3xl/relaxed font-bold first-letter:capitalize">
        {title}
      </div>
      {/* Country */}
      {country && formatCountry(JSON.parse(country).country) && (
        <div className="text-sm/relaxed my-3">
          <span className="flex gap-2 text-[#ecd9cb]">
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
