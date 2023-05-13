import { FC, useContext, useEffect, useState } from "react";
import { Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { CarouselContext } from "pure-react-carousel";
import BottomBar from "./BottomBar";
import ArticleThumbnailHolder from "./ArticleThumbnailHolder";
import ArticleSummaryHolder from "./ArticleSummaryHolder";
import ArticleDetailsHolder from "./ArticleDetailsHolder";
import SentimentHolder from "./SentimentHolder";
import EmotionHolder from "./EmotionHolder";
import ImageHolder from "../common/ImageHolder";
import useOnResizeOrOnOrientationChange from "@/hooks/useOnResizeOrOnOrientationChange";
import useIsInPwaMode from "@/hooks/useIsInPwaMode";

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
  pubDate: string | null;
  description: string | null;
  summary: string;
  generatedByAi: boolean;
  category: string | null;
  creator: string | null;
  source: string | null;
  country: string | null;
  keywords: string | null;
  sentiment: string;
  emotion: string;
  tabIndexStart: number;
  isFetchingNewArticles: boolean;
  otherStyles?: { [key: string]: string };
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
  generatedByAi,
  category,
  creator,
  source,
  country,
  keywords,
  sentiment,
  emotion,
  tabIndexStart,
  isFetchingNewArticles,
  otherStyles,
}) => {
  const { isInPwaMode } = useIsInPwaMode();

  const carouselContext = useContext(CarouselContext);

  const [currentSlide, setCurrentSlide] = useState<number>(
    carouselContext.state.currentSlide
  );

  const { innerWidth } = useOnResizeOrOnOrientationChange();

  useEffect(() => {
    const onChange = () => {
      setCurrentSlide(carouselContext.state.currentSlide);
    };
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <div id={id} className={`flex flex-col ${className}`} style={otherStyles}>
      {/* Top padding to ensure article holder does not overlap with top bar */}
      <div className="py-6">
        {/* Horizontal separator */}
        <div className="h-[1px] w-full bg-[#ecd9cb]"></div>
      </div>
      {/* Article holder */}
      <div
        className="flex-1"
        style={{
          maxHeight: isInPwaMode
            ? "calc(100vh - 10rem)"
            : "calc(100dvh - 10rem)",
        }}
      >
        {/* Content holder */}
        <div
          className="grid grid-rows-1 lg:grid-cols-[3fr_1fr] gap-3"
          style={{
            maxHeight: isInPwaMode
              ? "calc(100vh - 10rem)"
              : "calc(100dvh - 10rem)",
          }}
        >
          {/* Carousel holder */}
          <div
            className="bg-[#303030] rounded flex flex-col overflow-hidden"
            style={{
              maxHeight: isInPwaMode
                ? "calc(100vh - 10rem)"
                : "calc(100dvh - 10rem)",
            }}
          >
            <div
              className="flex-1 flex flex-col justify-between rounded"
              style={{
                maxHeight: isInPwaMode
                  ? "calc(100vh - 10rem)"
                  : "calc(100dvh - 10rem)",
              }}
            >
              <Slider tabIndex={-1}>
                {/* Two urls are added in background image so that even if the first link is broken, the default background image is used */}
                <Slide
                  index={0}
                  tabIndex={-1}
                  className="article-content-holder p-4 text-white overflow-y-auto bg-scroll bg-no-repeat bg-cover bg-center"
                  style={{
                    minHeight:
                      innerWidth < 1024
                        ? isInPwaMode
                          ? "calc(100vh - 22rem)"
                          : "calc(100dvh - 22rem)"
                        : isInPwaMode
                        ? "calc(100vh - 13rem)"
                        : "calc(100dvh - 13rem)",
                    backgroundImage: imgUrl
                      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 1) 100%), url("${imgUrl}"), url("/images/default_article_bg.jpeg")`
                      : "none",
                  }}
                >
                  <ArticleThumbnailHolder
                    title={title}
                    description={description}
                    country={country}
                    pubDate={pubDate}
                  />
                </Slide>
                <Slide
                  index={1}
                  tabIndex={-1}
                  className="article-content-holder p-4 text-white
                    overflow-y-auto"
                  style={{
                    minHeight:
                      innerWidth < 1024
                        ? isInPwaMode
                          ? "calc(100vh - 22rem)"
                          : "calc(100dvh - 22rem)"
                        : isInPwaMode
                        ? "calc(100vh - 13rem)"
                        : "calc(100dvh - 13rem)",
                  }}
                >
                  <ArticleSummaryHolder
                    source={source}
                    summary={summary}
                    generatedByAi={generatedByAi}
                    articleUrl={articleUrl}
                  />
                </Slide>
                <Slide
                  index={2}
                  tabIndex={-1}
                  className="article-content-holder p-4 text-white overflow-y-auto"
                  style={{
                    minHeight:
                      innerWidth < 1024
                        ? isInPwaMode
                          ? "calc(100vh - 22rem)"
                          : "calc(100dvh - 22rem)"
                        : isInPwaMode
                        ? "calc(100vh - 13rem)"
                        : "calc(100dvh - 13rem)",
                  }}
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
                        loadingIconColor="black"
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
                          loadingIconColor="black"
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
                          loadingIconColor="black"
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
                        loadingIconColor="black"
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
        isFetchingNewArticles={isFetchingNewArticles}
      />
    </div>
  );
};

export default ArticleHolder;
