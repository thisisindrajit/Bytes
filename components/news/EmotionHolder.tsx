import Image from "next/image";
import { FC, useState } from "react";
import Loading from "../common/Loading";

interface EmotionHolderProps {
  emotion: string;
}

const EmotionHolder: FC<EmotionHolderProps> = ({ emotion }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const showEmotion = (emotion: string) => {
    switch (emotion) {
      case "anger":
        return "/images/emojis/anger.png";
      case "disgust":
        return "/images/emojis/disgust.png";
      case "fear":
        return "/images/emojis/fear.png";
      case "joy":
        return "/images/emojis/joy.png";
      case "sadness":
        return "/images/emojis/sadness.png";
      case "surprise":
        return "/images/emojis/surprise.png";
      case "neutral":
        return "/images/emojis/neu.png";
      default:
        return "/images/emojis/neu.png";
    }
  };

  const returnEmotionValue = (emotion: string) => {
    switch (emotion) {
      case "anger":
        return "Anger";
      case "disgust":
        return "Disgust";
      case "fear":
        return "Fear";
      case "joy":
        return "Joy";
      case "sadness":
        return "Sadness";
      case "surprise":
        return "Surprise";
      case "neutral":
        return "Neutral";
      default:
        return "Neutral";
    }
  };

  return (
    <div className="bg-[#303030] rounded p-2 lg:p-4 h-32 lg:h-full overflow-y-auto text-white">
      <div className="flex flex-col min-h-full h-fit gap-2">
        <div className="text-xs lg:text-sm text-[#ecd9cb] uppercase">
          Emotion
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
            } relative h-16 w-16 lg:h-24 lg:w-24 xl:h-32 xl:w-32 3xl:h-48 3xl:w-48`}
          >
            <Image
              src={showEmotion(emotion)}
              alt={`${returnEmotionValue(emotion)} icon`}
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
              <span>{returnEmotionValue(emotion)}</span>
              <span className="text-[#ecd9cb]">•</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmotionHolder;
