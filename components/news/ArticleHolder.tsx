import { FC, useState } from "react";
import BottomBar from "./BottomBar";
import ArticleThumbnailHolder from "./ArticleThumbnailHolder";
import ArticleSummaryHolder from "./ArticleSummaryHolder";
import ArticleDetailsHolder from "./ArticleDetailsHolder";
import SentimentHolder from "./SentimentHolder";
import EmotionHolder from "./EmotionHolder";
import ImageHolder from "../common/ImageHolder";
import Carousel from "nuka-carousel";

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
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  return (
    <div id={id} className={`flex flex-col ${className}`}>
      {/* Top padding to ensure article holder does not overlap with top bar */}
      <div className="py-6">
        {/* Horizontal separator */}
        <div className="h-[1px] w-full bg-[#ecd9cb]"></div>
      </div>
      {/* Article holder */}
      <div className="flex-1 max-h-[calc(100vh-10rem)]">
        {/* Content holder */}
        <div className="grid grid-rows-1 lg:grid-cols-[3fr_1fr] gap-3 max-h-[calc(100vh-10rem)]">
          {/* Carousel holder */}
          <div className="bg-[#303030] rounded flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)]">
            {/* Carousel */}
            <Carousel
              withoutControls={true}
              speed={10}
              dragThreshold={0.25}
              // swiping={false}
              // dragging={false}
              slideIndex={slideIndex}
              afterSlide={(currentSlideIndex) =>
                setSlideIndex(currentSlideIndex)
              }
              slidesToScroll={1}
              disableEdgeSwiping={true}
            >
              <div
                tabIndex={-1}
                className="h-[calc(100vh-22rem)] max-h-[calc(100vh-22rem)] lg:h-[calc(100vh-13rem)] lg:max-h-[calc(100vh-13rem)] overflow-y-auto bg-scroll bg-no-repeat bg-cover bg-center text-white"
                style={{
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
              </div>
              <div
                tabIndex={-1}
                className="h-[calc(100vh-22rem)] max-h-[calc(100vh-22rem)] lg:h-[calc(100vh-13rem)] lg:max-h-[calc(100vh-13rem)] overflow-y-auto text-white"
              >
                <ArticleSummaryHolder
                  source={source}
                  summary={summary}
                  generatedByAi={generatedByAi}
                  articleUrl={articleUrl}
                />
              </div>
              <div
                tabIndex={-1}
                className="h-[calc(100vh-22rem)] max-h-[calc(100vh-22rem)] lg:h-[calc(100vh-13rem)] lg:max-h-[calc(100vh-13rem)] overflow-y-auto text-white"
              >
                <ArticleDetailsHolder
                  category={category}
                  creator={creator}
                  source={source}
                  country={country}
                  keywords={keywords}
                />
              </div>
            </Carousel>
            <div className="bg-[#ecd9cb] flex items-center py-[1.6rem] px-4 lg:py-6 h-8">
              {slideIndex === 2 && (
                <button
                  onClick={() => setSlideIndex(1)}
                  tabIndex={tabIndexStart + 3}
                  className="animate-slide-right flex gap-2 items-center cursor-pointer"
                >
                  <ImageHolder
                    heightAndWidthClasses="h-4 w-4"
                    src="/images/svg/left-arrow.svg"
                    alt="left arrow icon"
                    priority={true}
                    loadingIconColor="black"
                    showLoading
                  />
                  <span className="text-sm uppercase">Summary by AI</span>
                </button>
              )}
              {slideIndex === 1 && (
                <div className="flex items-center justify-between w-full">
                  {/* Previous button */}
                  <button
                    tabIndex={tabIndexStart + 1}
                    onClick={() => setSlideIndex(0)}
                    className="animate-slide-right flex gap-2 items-center cursor-pointer"
                  >
                    <ImageHolder
                      heightAndWidthClasses="h-4 w-4"
                      src="/images/svg/left-arrow.svg"
                      alt="left arrow icon"
                      priority={true}
                      loadingIconColor="black"
                      showLoading
                    />
                    <span className="text-sm uppercase">Thumbnail</span>
                  </button>
                  {/* Next button */}
                  <button
                    tabIndex={tabIndexStart + 2}
                    onClick={() => setSlideIndex(2)}
                    className="animate-slide-left flex gap-2 items-center cursor-pointer"
                  >
                    <span className="text-sm uppercase">Details</span>
                    <ImageHolder
                      heightAndWidthClasses="h-4 w-4"
                      src="/images/svg/right-arrow.svg"
                      alt="right arrow icon"
                      priority={true}
                      loadingIconColor="black"
                      showLoading
                    />
                  </button>
                </div>
              )}
              {slideIndex === 0 && (
                <button
                  tabIndex={tabIndexStart}
                  onClick={() => setSlideIndex(1)}
                  className="animate-slide-left mx-auto mr-0 flex gap-2 items-center cursor-pointer"
                >
                  <span className="text-sm uppercase">Summary by AI</span>
                  <ImageHolder
                    heightAndWidthClasses="h-4 w-4"
                    src="/images/svg/right-arrow.svg"
                    alt="right arrow icon"
                    priority={true}
                    loadingIconColor="black"
                    showLoading
                  />
                </button>
              )}
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
