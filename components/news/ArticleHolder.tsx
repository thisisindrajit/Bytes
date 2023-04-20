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
  articleUrl: string;
  title: string;
  pubDate: string;
  description: string | null;
  aiSummary: string;
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
  articleUrl,
  title,
  pubDate,
  description,
  aiSummary,
  ...props
}) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );

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
    const seconds = publishedObj.getSeconds();
    const amOrPm = publishedObj.getHours() >= 12 ? "PM" : "AM";

    let fullDate = `${date}/${month}/${year}`;

    return `${fullDate} AT ${hours}:${minutes}:${seconds} ${amOrPm} (GMT)`;
  };

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
      {/* <div className="flex-1 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-3 place-content-stretch max-h-[calc(100vh-10rem)]"> */}
      <div className="flex-1 max-h-[calc(100vh-10rem)]">
        {/* Content holder */}
        <div className="grid grid-rows-1 lg:grid-cols-[3fr_1fr] gap-3 max-h-[calc(100vh-10rem)]">
          {/* Carousel holder */}
          <div className="bg-[#303030] rounded flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)]">
            <div className="flex-1 flex flex-col justify-between max-h-[calc(100vh-10rem)]rounded">
              <Slider>
                <Slide
                  index={0}
                  className="min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto bg-scroll bg-no-repeat bg-cover text-white "
                  style={{
                    backgroundImage: imgUrl
                      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 75%, rgba(0, 0, 0, 0.9) 100%), url("${imgUrl}")`
                      : "none",
                  }}
                >
                  <div className="p-4">
                    {/* Title */}
                    <div className="text-2xl/relaxed lg:text-3xl/relaxed font-bold line-clamp-6">
                      {title}
                    </div>
                    {/* Pub date */}
                    <div className="text-xs my-4 flex items-center w-fit gap-2">
                      <div className="relative h-3 w-3">
                        <Image
                          src="/images/svg/clock.svg"
                          alt="clock icon"
                          fill={true}
                          priority
                        />
                      </div>
                      <span>{formatDateAndTime(pubDate)}</span>
                    </div>
                    {/* Horizontal separator */}
                    <div className="my-4 lg:my-6 h-[1px] w-full bg-[#ecd9cb]"></div>
                    {/* Description */}
                    {description && (
                      <div className="text-base/loose mt-2 line-clamp-[8]">
                        {description}
                      </div>
                    )}
                    {/* Check out AI summary text block */}
                    <div className="text-base/loose mt-4 lg:mt-6 border-l border-[#ecd9cb] w-fit px-4 py-2">
                      <span>Click on</span>
                      <div className="inline-block mx-2">
                        <span className="text-sm uppercase text-[#ecd9cb]">
                          Summary by AI
                        </span>
                        <div className="inline-block relative h-4 w-4 align-middle ml-2">
                          <Image
                            src="/images/svg/right-arrow-cream.svg"
                            alt="right arrow cream icon"
                            fill={true}
                            priority
                          />
                        </div>
                      </div>
                      <span>
                        to read the AI generated summary for the article.
                      </span>
                    </div>
                    {/* How to read full article text block */}
                    <div className="text-base/loose mb-4 lg:mb-6 border-l border-[#ecd9cb] w-fit px-4 py-2">
                      <span>Click on</span>
                      <div className="inline-block mx-2">
                        <div className="inline-block relative h-4 w-4 align-middle">
                          <Image
                            src="/images/svg/link-cream.svg"
                            alt="link cream icon"
                            fill={true}
                            priority
                          />
                        </div>
                      </div>
                      <span>in the bottom bar to read the full article.</span>
                    </div>
                  </div>
                </Slide>
                <Slide
                  index={1}
                  className="p-4 min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto text-white"
                >
                  <div className="p-4">
                    <div className="text-lg text-[#ecd9cb]">
                      Article Summary
                    </div>
                    {/* Summary holder */}
                    <div className="bg-[#212121] border border-[#ecd9cb] px-6 py-4 rounded text-base/loose my-4">
                      {aiSummary}
                      <div className="text-xs mt-6 mb-2 text-[#ecd9cb]">
                        Generated by AI
                      </div>
                    </div>
                    {/* Link to read full article */}
                    <div className="text-base/loose my-4 lg:my-6 border-l border-[#ecd9cb] w-fit px-4 py-2">
                      <span>Want to know more?</span>
                      <a
                        href={articleUrl}
                        className="text-[#ecd9cb] mx-1 no-underline hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here
                      </a>
                      <span>to read the full article!</span>
                    </div>
                  </div>
                </Slide>
                <Slide
                  index={2}
                  className="p-4 min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto text-white"
                >
                  <div className="p-4">
                    Other data and link to show meta data
                  </div>
                </Slide>
              </Slider>
              <div className="bg-[#ecd9cb] flex items-center py-[1.6rem] px-4 lg:py-6 h-8">
                {currentSlide === 2 && (
                  <ButtonBack className="animate-slide-right">
                    <div className="flex gap-2 items-center">
                      <div className="relative h-4 w-4">
                        <Image
                          src="/images/svg/left-arrow.svg"
                          alt="left arrow icon"
                          fill={true}
                        />
                      </div>
                      <span className="text-sm uppercase">Summary by AI</span>
                    </div>
                  </ButtonBack>
                )}
                {currentSlide === 1 && (
                  <div className="flex items-center justify-between w-full">
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
                    <ButtonNext className="animate-slide-left">
                      <div className="flex gap-2 items-center">
                        <span className="text-sm uppercase">Other data</span>
                        <div className="relative h-4 w-4">
                          <Image
                            src="/images/svg/right-arrow.svg"
                            alt="right arrow icon"
                            fill={true}
                          />
                        </div>
                      </div>
                    </ButtonNext>
                  </div>
                )}
                {currentSlide === 0 && (
                  <ButtonNext className="mx-auto mr-0 animate-slide-left">
                    <div className="flex gap-2 items-center">
                      <span className="text-sm uppercase">Summary by AI</span>
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
              <div className="text-sm text-[#ecd9cb] uppercase">Sentiment</div>
            </div>
            <div className="bg-[#303030] rounded p-4 h-32 lg:h-full overflow-y-auto text-white">
            <div className="text-sm text-[#ecd9cb] uppercase">Emotion</div>
            </div>
          </div>
        </div>
        {/* Ads holder (Can be used in future if needed) */}
        {/* <div className="hidden xl:block bg-[#303030] overflow-y-auto rounded p-4 text-white">
          This is the ads holder
        </div> */}
      </div>
      <BottomBar
        className="mt-3"
        link={articleUrl}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        prevId={prevId}
        nextId={nextId}
      />
    </div>
  );
};

export default ArticleHolder;
