import Image from "next/image";
import { FC, useState } from "react";
import Loading from "../common/Loading";
import InfoModal from "../common/InfoModal";

interface SentimentHolderProps {
  sentiment: string;
  openModal: (type: "emotion" | "sentiment" | "info" | null, predictedValue: string | null) => void;
}

const SentimentHolder: FC<SentimentHolderProps> = ({ sentiment, openModal }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const showSentiment = (sentiment: string) => {
    switch (sentiment) {
      case "pos":
        return "/images/emojis/pos.png";
      case "neg":
        return "/images/emojis/neg.png";
      case "neu":
        return "/images/emojis/neu.png";
      default:
        return "/images/emojis/neu.png";
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
      <div
        className="bg-[#303030] rounded p-2 lg:p-4 h-32 lg:h-full overflow-y-auto text-white cursor-pointer lg:hover:bg-[#525252]"
        onClick={() => openModal("sentiment", sentiment)}
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
              } relative h-16 w-16 lg:h-24 lg:w-24 xl:h-32 xl:w-32 3xl:h-48 3xl:w-48 emoji-holder`}
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
              <div className="hidden md:flex my-2 text-center text-white text-sm xl:text-base items-center justify-center gap-2 value-holder">
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
