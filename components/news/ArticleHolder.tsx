import { FC, ReactNode } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

interface ArticleHolderProps {
  id?: string;
  className?: string;
  children?: ReactNode;
  // All other props
  [x: string]: any;
}

const ArticleHolder: FC<ArticleHolderProps> = ({
  id,
  children,
  className = "",
  ...props
}) => {
  return (
    <div id={id} className={`flex flex-col ${className}`} {...props}>
      {/* Top padding to ensure article holder does not overlap with top bar */}
      <div className="py-6">
        {/* Horizontal separator */}
        <div className="h-[1px] w-full bg-[#ecd9cb]"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-3 place-content-stretch max-h-[calc(100vh-8rem)]">
        {/* Content holder */}
        <div className="grid grid-rows-1 lg:grid-cols-[3fr_1fr] gap-3 max-h-[calc(100vh-8rem)]">
          {/* Carousel holder */}
          <div className="bg-white rounded flex flex-col relative max-h-[calc(100vh-8rem)]">
            <CarouselProvider
              naturalSlideWidth={0}
              naturalSlideHeight={0}
              isIntrinsicHeight={false}
              className="flex-1 flex flex-col justify-between max-h-[calc(100vh-8rem)]"
              totalSlides={2}
            >
              <Slider>
                <Slide
                  index={0}
                  className="min-h-[calc(100vh-15rem)] lg:min-h-[calc(100vh-11rem)] overflow-y-auto"
                >
                  <div className="h-screen p-6">
                    Title and description (has a larger height)
                  </div>
                </Slide>

                <Slide
                  index={1}
                  className="p-4 min-h-[calc(100vh-15rem)] lg:min-h-[calc(100vh-11rem)] overflow-y-auto"
                >
                  <div className="p-6">
                    Summarized article and link to full article
                  </div>
                </Slide>
              </Slider>
              <div className="bg-[#ecd9cb] flex items-center justify-between p-6 h-8">
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          {/* Emotion and sentiment predictions holder */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-rows-2 gap-3">
            <div className="bg-white rounded p-4">Sentiment holder</div>
            <div className="bg-white rounded p-4">Emotions holder</div>
          </div>
        </div>
        {/* Metadata holder */}
        <div className="hidden xl:block bg-white overflow-y-auto rounded p-4">
          This is the metadata holder
        </div>
      </div>
      {children}
    </div>
  );
};

export default ArticleHolder;
