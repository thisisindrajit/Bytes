import Image from "next/image";
import { FC, useState } from "react";
import Loading from "../common/Loading";
import Tippy from "@tippyjs/react";

interface SentimentHolderProps {
  sentiment: string;
}

const SentimentHolder: FC<SentimentHolderProps> = ({ sentiment }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const showSentiment = (sentiment: string) => {
    switch (sentiment) {
      case "pos":
        return "/images/emojis/pos.png";
      case "neg":
        return "/images/emojis/neg.png";
      case "neu":
        return "/images/emojis/neutral.png";
      default:
        return "/images/emojis/neutral.png";
    }
  };

  const returnSentimentValue = (sentiment: string) => {
    switch (sentiment) {
      case "pos":
        return "Positive";
      case "neg":
        return "Negative";
      case "neu":
        return "Neutral";
      default:
        return "Neutral";
    }
  };

  return (
    <Tippy
      theme="light"
      className="p-2 md:hidden tippy-tooltip"
      zIndex={5}
      placement={window.innerHeight < 667 && window.innerHeight < 1024 ? "left" : "top"}
      interactive={true}
      content={
        <div>
          <span>The predicted sentiment is</span>
          <span
            className={`font-bold underline underline-offset-4 decoration-dotted mx-1 uppercase ${
              sentiment === "pos"
                ? "text-green-500"
                : sentiment === "neu"
                ? "text-orange-500"
                : "text-red-500"
            }`}
          >
            {returnSentimentValue(sentiment)}
          </span>
        </div>
      }
    >
      <div
        // data-tooltip-id="pred-sentiment"
        // data-tooltip-content={`The predicted sentiment is ${returnSentimentValue(
        //   sentiment
        // ).toUpperCase()}.`}
        className="bg-[#303030] rounded p-2 lg:p-4 h-32 lg:h-full overflow-y-auto text-white"
      >
        <div className="flex flex-col min-h-full h-fit gap-2">
          <div className="text-xs lg:text-sm text-[#ecd9cb] uppercase">
            Sentiment
          </div>
          <div className="flex-1 flex lg:flex-col items-center justify-center gap-4 lg:gap-2 lg:my-4 emojis-holder">
            {!isImageLoaded && (
              <Loading
                heightAndWidthClassesForLoadingIcon="h-8 w-8 lg:h-16 lg:w-16"
                noText
              />
            )}
            <div
              className={`${
                isImageLoaded ? "block" : "hidden"
              } relative h-16 w-16 lg:h-24 lg:w-24 xl:h-28 xl:w-28 3xl:h-48 3xl:w-48 emoji-holder`}
            >
              <Image
                src={showSentiment(sentiment)}
                alt={`${returnSentimentValue(sentiment)} icon`}
                fill={true}
                className="self-center"
                onLoadingComplete={() => {
                  setIsImageLoaded(true);
                }}
                priority
              />
            </div>
            {isImageLoaded && (
              <div className="hidden md:flex text-center text-white text-sm xl:text-base items-center justify-center gap-2 value-holder">
                <span className="text-[#ecd9cb]">•</span>
                <span>{returnSentimentValue(sentiment)}</span>
                <span className="text-[#ecd9cb]">•</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Tippy>
  );
};

export default SentimentHolder;
