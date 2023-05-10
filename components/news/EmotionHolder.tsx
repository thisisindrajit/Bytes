import Image from "next/image";
import { FC, useState } from "react";
import Loading from "../common/Loading";
import Tippy from "@tippyjs/react";
import useOnResize from "@/hooks/useOnResize";
import {
  returnEmotionValue,
  showEmotion,
} from "@/utilities/emotionHolderUtilities";

interface EmotionHolderProps {
  emotion: string;
}

const EmotionHolder: FC<EmotionHolderProps> = ({ emotion }) => {
  const emotionValue = returnEmotionValue(emotion);

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const { isTopPlacement } = useOnResize();

  return (
    <Tippy
      theme="light"
      className="p-2 md:hidden tippy-tooltip"
      zIndex={5}
      placement={isTopPlacement ? "left" : "top"}
      interactive={true}
      content={
        <div>
          {emotionValue !== "Not available" ? (
            <>
              <span>The predicted emotion is</span>
              <span className="font-bold underline decoration-dotted underline-offset-4 mx-1 uppercase">
                {emotionValue}
              </span>
            </>
          ) : (
            <>
              <span>Emotion prediction is</span>
              <span className="font-bold underline underline-offset-4 decoration-dotted mx-1 uppercase text-red-500">
                not available
              </span>
            </>
          )}
        </div>
      }
    >
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
              } relative h-16 w-16 lg:h-24 lg:w-24 xl:h-28 xl:w-28 3xl:h-48 3xl:w-48 emoji-holder`}
            >
              <Image
                src={showEmotion(emotion)}
                alt={`${emotionValue} icon`}
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
                <span>{returnEmotionValue(emotion)}</span>
                <span className="text-[#ecd9cb]">•</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Tippy>
  );
};

export default EmotionHolder;
