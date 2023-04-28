import { FC } from "react";
import ImageHolder from "../common/ImageHolder";
import CountryFlagHolder from "./CountryFlagHolder";

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

  const capitalizeCountryName = (country: string) => {
    switch (country) {
      case "india":
        return "India";
      case "united states of america":
        return "United States of America";
      case "australia":
        return "Australia";
      case "united kingdom":
        return "United Kingdom";
      default:
        return country
          .split(" ")
          .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
          .join(" ");
    }
  };

  const formatCountry = (inputCountries: string[]) => {
    if (inputCountries.length === 0) return null;

    if (inputCountries.length > 1) {
      return (
        <>
          <CountryFlagHolder
            url="https://twemoji.maxcdn.com/v/latest/svg/1f30f.svg"
            alt="Globe emoji"
          />
          <div>
            {inputCountries.map((c) => capitalizeCountryName(c)).join(", ")}
          </div>
        </>
      );
    }

    const country = inputCountries[0];

    switch (country) {
      case "india":
        return (
          <>
            <CountryFlagHolder
              url="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1f3.svg"
              alt="Indian flag"
            />
            <span>{capitalizeCountryName(country)}</span>
          </>
        );
      case "united states of america":
        return (
          <>
            <CountryFlagHolder
              url="https://twemoji.maxcdn.com/v/latest/svg/1f1fa-1f1f8.svg"
              alt="USA flag"
            />
            <span>{capitalizeCountryName(country)}</span>
          </>
        );
      case "australia":
        return (
          <>
            <CountryFlagHolder
              url="https://twemoji.maxcdn.com/v/latest/svg/1f1e6-1f1fa.svg"
              alt="Australian flag"
            />
            <span>{capitalizeCountryName(country)}</span>
          </>
        );
      case "united kingdom":
        return (
          <>
            <CountryFlagHolder
              url="https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg"
              alt="UK flag"
            />
            <span>{capitalizeCountryName(country)}</span>
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
