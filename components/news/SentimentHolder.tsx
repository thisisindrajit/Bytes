import Image from "next/image";
import { FC, useState } from "react";

interface SentimentHolderProps {
  sentiment: "pos" | "neg" | "neu";
}

const SentimentHolder: FC<SentimentHolderProps> = ({ sentiment }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const showSentiment = (sentiment: "pos" | "neg" | "neu") => {
    switch (sentiment) {
      case "pos":
        return "/images/emojis/positive.png";
      case "neg":
        return "/images/emojis/negative.png";
      case "neu":
        return "/images/emojis/neutral.png";
      default:
        return "/images/emojis/neutral.png";
    }
  };

  const returnSentimentValue = (sentiment: "pos" | "neg" | "neu") => {
    switch (sentiment) {
      case "pos":
        return "Positive";
      case "neg":
        return "Negative";
      case "neu":
        return "Neutral";
      default:
        return "No sentiment";
    }
  };

  return (
    <div className="bg-[#303030] rounded  p-2 md:p-4 h-32 lg:h-full overflow-y-auto text-white">
      <div className="flex flex-col min-h-full h-fit gap-2">
        <div className="text-xs lg:text-sm text-[#ecd9cb] uppercase">
          Sentiment
        </div>
        <div className="flex-1 flex lg:flex-col items-center justify-center gap-4 lg:gap-2">
          {!isImageLoaded && <div className="text-sm">Loading...</div>}
          <div
            className={`${
              isImageLoaded ? "block" : "hidden"
            } relative h-16 w-16 lg:h-32 lg:w-32 xl:h-44 xl:w-44 3xl:h-64 3xl:w-64`}
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
            <div className="hidden md:flex my-2 text-center text-white text-sm xl:text-base items-center justify-center gap-2">
              <span className="text-[#ecd9cb]">•</span>
              <span>{returnSentimentValue(sentiment)}</span>
              <span className="text-[#ecd9cb]">•</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentHolder;
