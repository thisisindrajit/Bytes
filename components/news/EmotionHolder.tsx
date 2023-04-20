import Image from "next/image";
import { FC } from "react";

interface EmotionHolderProps {
  emotion:
    | "anger"
    | "disgust"
    | "fear"
    | "joy"
    | "sadness"
    | "surprise"
    | "neutral";
}

const EmotionHolder: FC<EmotionHolderProps> = ({ emotion }) => {
  const showEmotion = (
    emotion:
      | "anger"
      | "disgust"
      | "fear"
      | "joy"
      | "sadness"
      | "surprise"
      | "neutral"
  ) => {
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
        return "/images/emojis/neutral.png";
      default:
        return "/images/emojis/neutral.png";
    }
  };

  const returnEmotionValue = (
    emotion:
      | "anger"
      | "disgust"
      | "fear"
      | "joy"
      | "sadness"
      | "surprise"
      | "neutral"
  ) => {
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
        return "No emotion";
    }
  };

  return (
    <div className="bg-[#303030] rounded  p-2 md:p-4 h-32 lg:h-full overflow-y-auto text-white">
      <div className="flex flex-col min-h-full h-fit gap-2">
        <div className="text-xs lg:text-sm text-[#ecd9cb] uppercase">
          Emotion
        </div>
        <div className="flex-1 flex lg:flex-col items-center justify-center gap-4 lg:gap-2">
          <div className="relative h-16 w-16 lg:h-32 lg:w-32 xl:h-44 xl:w-44 3xl:h-64 3xl:w-64">
            <Image
              src={showEmotion(emotion)}
              alt={`${returnEmotionValue(emotion)} icon`}
              fill={true}
              className="self-center"
              unoptimized
            />
          </div>
          <div className="hidden md:flex my-2 text-center text-white text-sm xl:text-base items-center justify-center gap-2">
            <span className="text-[#ecd9cb]">•</span>
            <span>{returnEmotionValue(emotion)}</span>
            <span className="text-[#ecd9cb]">•</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionHolder;
