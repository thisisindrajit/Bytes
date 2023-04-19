import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { CarouselContext } from "pure-react-carousel";
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
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

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
          <div className="bg-white rounded flex flex-col overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="flex-1 flex flex-col justify-between max-h-[calc(100vh-8rem)]rounded">
              <Slider>
                <Slide
                  index={0}
                  className="min-h-[calc(100vh-20rem)] lg:min-h-[calc(100vh-11rem)] overflow-y-auto"
                >
                  <div className="h-[200vh] p-4">
                    Title and description (has a larger height)
                  </div>
                </Slide>
                <Slide
                  index={1}
                  className="p-4 min-h-[calc(100vh-20rem)] lg:min-h-[calc(100vh-11rem)] overflow-y-auto"
                >
                  <div className="p-4">
                    Summarized article and link to full article
                  </div>
                </Slide>
              </Slider>
              <div className="bg-[#ecd9cb] flex items-center py-[1.6rem] px-4 lg:py-6 h-8">
                {currentSlide === 1 && (
                  <ButtonBack className="animate-slide-right">{`< Details `}</ButtonBack>
                )}
                {currentSlide === 0 && (
                  <ButtonNext className="mx-auto mr-0 animate-slide-left">{`Summary >`}</ButtonNext>
                )}
              </div>
            </div>
          </div>
          {/* Emotion and sentiment predictions holder */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-rows-2 gap-3">
            <div className="bg-white rounded p-4 h-32 lg:h-full overflow-y-auto">
              Sentiment holder
            </div>
            <div className="bg-white rounded p-4 h-32 lg:h-full overflow-y-auto">
              Emotions holder
            </div>
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
