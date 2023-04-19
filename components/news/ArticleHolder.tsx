import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { CarouselContext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import BottomBar from "./BottomBar";

interface ArticleHolderProps {
  id?: string;
  className?: string;
  hasPrevious: boolean;
  hasNext: boolean;
  prevId: string | null;
  nextId: string | null;
  imgUrl: string | null;
  // All other props
  [x: string]: any;
}

const ArticleHolder: FC<ArticleHolderProps> = ({
  id,
  className = "",
  hasPrevious,
  hasNext,
  prevId,
  nextId,
  imgUrl,
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
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-3 place-content-stretch max-h-[calc(100vh-10rem)]">
        {/* Content holder */}
        <div className="grid grid-rows-1 lg:grid-cols-[3fr_1fr] gap-3 max-h-[calc(100vh-10rem)]">
          {/* Carousel holder */}
          <div className="bg-[#303030] rounded flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)]">
            <div className="flex-1 flex flex-col justify-between max-h-[calc(100vh-10rem)]rounded">
              <Slider>
                <Slide
                  index={0}
                  className="min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto bg-scroll bg-no-repeat bg-cover text-white"
                  style={{
                    backgroundImage: imgUrl
                      ? `linear-gradient(45deg, rgba(0, 0, 0, 0.65) 75%, transparent 100%), url("${imgUrl}")`
                      : "none",
                  }}
                >
                  <div className="h-[500px] p-4">
                    Title and description (has a larger height)
                  </div>
                </Slide>
                <Slide
                  index={1}
                  className="p-4 min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto text-white"
                >
                  <div className="p-4">
                    Summarized article and link to full article
                  </div>
                </Slide>
              </Slider>
              <div className="bg-[#ecd9cb] flex items-center py-[1.6rem] px-4 lg:py-6 h-8">
                {currentSlide === 1 && (
                  <ButtonBack className="animate-slide-right">
                    <div className="flex gap-2 items-center">
                      <div className="relative h-4 w-4">
                        <Image
                          src="/images/svg/left-arrow.svg"
                          alt="left arrow icon"
                          fill={true}
                        />
                      </div>
                      <span className="text-sm uppercase">Details</span>
                    </div>
                  </ButtonBack>
                )}
                {currentSlide === 0 && (
                  <ButtonNext className="mx-auto mr-0 animate-slide-left">
                    <div className="flex gap-2 items-center">
                      <span className="text-sm uppercase">Summary</span>
                      <div className="relative h-4 w-4">
                        <Image
                          src="/images/svg/right-arrow.svg"
                          alt="right arrow icon"
                          fill={true}
                        />
                      </div>
                    </div>
                  </ButtonNext>
                )}
              </div>
            </div>
          </div>
          {/* Emotion and sentiment predictions holder */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-rows-2 gap-3">
            <div className="bg-[#303030] rounded p-4 h-32 lg:h-full overflow-y-auto text-white">
              Sentiment holder
            </div>
            <div className="bg-[#303030] rounded p-4 h-32 lg:h-full overflow-y-auto text-white">
              Emotions holder
            </div>
          </div>
        </div>
        {/* Metadata holder */}
        <div className="hidden xl:block bg-[#303030] overflow-y-auto rounded p-4 text-white">
          This is the metadata holder
        </div>
      </div>
      <BottomBar
        className="mt-3"
        link="https://www.google.com"
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        prevId={prevId}
        nextId={nextId}
      />
    </div>
  );
};

export default ArticleHolder;
