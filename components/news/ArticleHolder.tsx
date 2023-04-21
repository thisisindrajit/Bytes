import { FC, useContext, useEffect, useState } from "react";
import { Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { CarouselContext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import BottomBar from "./BottomBar";
import ArticleThumbnailHolder from "./ArticleThumbnailHolder";
import ArticleSummaryHolder from "./ArticleSummaryHolder";
import ArticleDetailsHolder from "./ArticleDetailsHolder";
import SentimentHolder from "./SentimentHolder";
import EmotionHolder from "./EmotionHolder";
import ImageHolder from "../common/ImageHolder";

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
  summary: string;
  category: string[];
  creator: string[] | null;
  source: string;
  country: string[];
  keywords: string[] | null;
  sentiment: "pos" | "neg" | "neu";
  emotion:
    | "anger"
    | "disgust"
    | "fear"
    | "joy"
    | "sadness"
    | "surprise"
    | "neutral";
  tabIndexStart: number;
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
  summary,
  category,
  creator,
  source,
  country,
  keywords,
  sentiment,
  emotion,
  tabIndexStart,
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
      {/* <div className="flex-1 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-3 place-content-stretch max-h-[calc(100vh-10rem)]"> */}
      <div className="flex-1 max-h-[calc(100vh-10rem)]">
        {/* Content holder */}
        <div className="grid grid-rows-1 lg:grid-cols-[3fr_1fr] gap-3 max-h-[calc(100vh-10rem)]">
          {/* Carousel holder */}
          <div className="bg-[#303030] rounded flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)]">
            <div className="flex-1 flex flex-col justify-between max-h-[calc(100vh-10rem)] rounded">
              <Slider tabIndex={-1}>
                {/* Two urls are added in background image so that even if the first link is broken, the default background image is used */}
                <Slide
                  index={0}
                  tabIndex={-1}
                  className="min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto bg-[#303030] bg-scroll bg-no-repeat bg-cover text-white"
                  style={{
                    backgroundImage: imgUrl
                      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 75%, rgba(0, 0, 0, 0.9) 100%), url("${imgUrl}"), url("/images/default_article_bg.jpeg")`
                      : "none",
                  }}
                >
                  <ArticleThumbnailHolder
                    title={title}
                    description={description}
                    pubDate={pubDate}
                  />
                </Slide>
                <Slide
                  index={1}
                  tabIndex={-1}
                  className="p-4 min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto text-white"
                >
                  <ArticleSummaryHolder
                    summary={summary}
                    articleUrl={articleUrl}
                  />
                </Slide>
                <Slide
                  index={2}
                  tabIndex={-1}
                  className="p-4 min-h-[calc(100vh-22rem)] lg:min-h-[calc(100vh-13rem)] overflow-y-auto text-white"
                >
                  <ArticleDetailsHolder
                    category={category}
                    creator={creator}
                    source={source}
                    country={country}
                    keywords={keywords}
                  />
                </Slide>
              </Slider>
              <div className="bg-[#ecd9cb] flex items-center py-[1.6rem] px-4 lg:py-6 h-8">
                {currentSlide === 2 && (
                  <ButtonBack
                    tabIndex={tabIndexStart + 3}
                    className="animate-slide-right"
                  >
                    <div className="flex gap-2 items-center">
                      <ImageHolder
                        heightAndWidthClasses="h-4 w-4"
                        src="/images/svg/left-arrow.svg"
                        alt="left arrow icon"
                        priority={true}
                        color="black"
                        showLoading
                      />
                      <span className="text-sm uppercase">Summary by AI</span>
                    </div>
                  </ButtonBack>
                )}
                {currentSlide === 1 && (
                  <div className="flex items-center justify-between w-full">
                    <ButtonBack
                      tabIndex={tabIndexStart + 1}
                      className="animate-slide-right"
                    >
                      <div className="flex gap-2 items-center">
                        <ImageHolder
                          heightAndWidthClasses="h-4 w-4"
                          src="/images/svg/left-arrow.svg"
                          alt="left arrow icon"
                          priority={true}
                          color="black"
                          showLoading
                        />
                        <span className="text-sm uppercase">Thumbnail</span>
                      </div>
                    </ButtonBack>
                    <ButtonNext
                      tabIndex={tabIndexStart + 2}
                      className="animate-slide-left"
                    >
                      <div className="flex gap-2 items-center">
                        <span className="text-sm uppercase">Details</span>
                        <ImageHolder
                          heightAndWidthClasses="h-4 w-4"
                          src="/images/svg/right-arrow.svg"
                          alt="right arrow icon"
                          priority={true}
                          color="black"
                          showLoading
                        />
                      </div>
                    </ButtonNext>
                  </div>
                )}
                {currentSlide === 0 && (
                  <ButtonNext
                    tabIndex={tabIndexStart}
                    className="mx-auto mr-0 animate-slide-left"
                  >
                    <div className="flex gap-2 items-center">
                      <span className="text-sm uppercase">Summary by AI</span>
                      <ImageHolder
                        heightAndWidthClasses="h-4 w-4"
                        src="/images/svg/right-arrow.svg"
                        alt="right arrow icon"
                        priority={true}
                        color="black"
                        showLoading
                      />
                    </div>
                  </ButtonNext>
                )}
              </div>
            </div>
          </div>
          {/* Emotion and sentiment predictions holder */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-rows-2 gap-3">
            <SentimentHolder sentiment={sentiment} />
            <EmotionHolder emotion={emotion} />
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
        tabIndex={tabIndexStart + 4}
      />
    </div>
  );
};

export default ArticleHolder;
