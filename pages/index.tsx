import Holder from "@/components/common/Holder";
import Loading from "@/components/common/Loading";
import TopBar from "@/components/common/TopBar";
import ArticleHolder from "@/components/news/ArticleHolder";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Article } from "@/interfaces/Article";
import { CarouselProvider } from "pure-react-carousel";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { decode } from "html-entities";
import {
  cleanIfSourceIsMoneycontrol,
  scrollToTop,
} from "@/utilities/articleUtilites";

const Home = () => {
  let curTabIndexStartValue = 2;

  const [pagesFetched, setPagesFetched] = useState<number>(0);
  const [articlesData, setArticlesData] = useState<Article[]>([]);

  const loadMoreRef: any = useRef<any>(null);

  // GET method to fetch articles
  const getArticles = async (curLastKey: string) => {
    const options = {
      method: "GET",
    };

    const response = await fetch(
      `/api/articles?curLastKey=${curLastKey}`,
      options
    );

    if (response.status !== 200) {
      throw "Error fetching articles!";
    }

    const fetchedArticles = await response.json();

    return fetchedArticles;
  };

  const {
    data: results,
    isLoading,
    isError,
    isRefetchError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["articles"],
    ({ pageParam = "1" }) => getArticles(pageParam),
    {
      getNextPageParam: (lastAPIQueryData) => {
        return lastAPIQueryData.lastKey ? lastAPIQueryData.lastKey : null;
      },
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  // intersection observer
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage
  });

  useEffect(() => {
    if (!isFetchingNextPage && results?.pages[pagesFetched]?.data) {
      setArticlesData((prevArticles) => [
        ...prevArticles,
        ...results.pages[pagesFetched].data,
      ]);
      setPagesFetched((pagesFetched) => pagesFetched + 1);
    }
  }, [isFetchingNextPage, results, pagesFetched]);

  useEffect(() => {
    // This is to focus the particular element in the page when the page is loaded
    document.getElementById("all-articles-holder")?.focus();
  }, []);

  return (
    <div
      tabIndex={1} // This makes sure this is the first element to be focused
      id="all-articles-holder"
      className="max-h-[100dvh] w-full relative overflow-y-auto outline-none"
    >
      {/* Top bar */}
      <TopBar onClickIcon={scrollToTop} />
      {/* Articles holder */}
      <Holder
        className={`${
          (isError || isLoading || isRefetchError) &&
          "h-[100dvh] w-full flex items-center justify-center overflow-hidden"
        }`}
      >
        {isError || isRefetchError ? (
          <span className="text-sm/loose lg:text-base/loose border border-red-500 p-3 rounded text-center text-red-500 m-6">
            Error fetching articles! Please try again by refreshing the page!
          </span>
        ) : !isLoading && articlesData ? (
          <>
            {articlesData.map((article: Article, index: number) => {
              if (index > 0) {
                curTabIndexStartValue += 5;
              }

              return (
                <CarouselProvider
                  key={article.id}
                  naturalSlideWidth={0}
                  naturalSlideHeight={0}
                  isIntrinsicHeight={false}
                  totalSlides={3}
                  touchEnabled={false}
                  dragEnabled={false}
                >
                  <ArticleHolder
                    id={article.id}
                    className="min-h-[100dvh] snap-always snap-center p-4 overflow-hidden"
                    hasPrevious={index === 0 ? false : true}
                    hasNext={index === articlesData.length - 1 ? false : true}
                    prevId={articlesData[index - 1]?.id}
                    nextId={articlesData[index + 1]?.id}
                    title={
                      article.source === "moneycontrol"
                        ? cleanIfSourceIsMoneycontrol(article.title)
                        : decode(article.title)
                    }
                    description={
                      article.description
                        ? article.source === "moneycontrol"
                          ? cleanIfSourceIsMoneycontrol(article.description)
                          : decode(article.description)
                        : null
                    }
                    pubDate={
                      article.pub_date
                        ? new Date(article.pub_date).toUTCString()
                        : null
                    }
                    imgUrl={article.image_url}
                    articleUrl={article.link}
                    summary={
                      article.summarized_text
                        ? article.summarized_text
                        : "No summary has been generated for this article. Please click on the link icon in the bottom navigation bar to read the full article. We apologize for the inconvenience."
                    }
                    generatedByAi={article.summarized_text ? true : false}
                    category={article.category}
                    creator={article.creator}
                    source={article.source}
                    country={article.country}
                    keywords={article.keywords}
                    sentiment={
                      article.predicted_sentiment
                        ? article.predicted_sentiment
                        : "neu"
                    }
                    emotion={
                      article.predicted_emotion
                        ? article.predicted_emotion
                        : "neutral"
                    }
                    tabIndexStart={curTabIndexStartValue}
                    isFetchingNewArticles={isFetchingNextPage}
                  />
                </CarouselProvider>
              );
            })}
            {/* If there are no more pages (data) to be shown */}
            {!hasNextPage ? (
              // If there are no articles in DB
              articlesData.length === 0 ? (
                <div className="h-[100dvh] w-full flex items-center justify-center text-white">
                  No articles available! 🥺
                </div>
              ) : (
                // If user has viewed all articles
                <div className="bg-[#ecd9cb] flex items-center justify-center p-6">
                  You have viewed all articles! 🎉
                </div>
              )
            ) : (
              <>
                {/* This ref is separate to make sure the next set of articles are loaded as soon as the user comes to the last fetched article */}
                <div ref={loadMoreRef}></div>
                <div>
                  {articlesData.length > 0 && (
                    <div className="bg-white flex items-center justify-center text-sm lg:text-base p-6">
                      Fetching more articles...
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <Loading
            heightAndWidthClassesForLoadingIcon="h-10 w-10 lg:h-12 lg:w-12"
            loadingText="Fetching articles..."
            className="text-white text-sm lg:text-base m-6"
          />
        )}
      </Holder>
    </div>
  );
};

export default Home;
