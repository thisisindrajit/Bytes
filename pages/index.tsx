import Holder from "@/components/common/Holder";
import Loading from "@/components/common/Loading";
import TopBar from "@/components/common/TopBar";
import ArticleHolder from "@/components/news/ArticleHolder";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Article } from "@/interfaces/Article";
import { CarouselProvider } from "pure-react-carousel";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import {
  cleanIfSourceIsMoneycontrol,
  showScrollbarOnlyIfArticleIsInViewport,
  scrollAllArticlesHolderToTop,
} from "@/utilities/articleUtilites";
import useScrollStopListener from "@/hooks/useScrollStopListener";
import useIsInPwaMode from "@/hooks/useIsInPwaMode";

const Home = () => {
  let curTabIndexStartValue = 2;

  const { isInPwaMode } = useIsInPwaMode();

  const [pagesFetched, setPagesFetched] = useState<number>(0);
  const [
    waitingForNewSetOfArticlesToBeSetInState,
    setWaitingForNewSetOfArticlesToBeSetInState,
  ] = useState<boolean>(false);
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

  const allArticlesHolderRef = useScrollStopListener(() => {
    // If a new set of articles have been fetched, then store them in state and update "pages fetched" state variable when the user stops scrolling
    if (results && waitingForNewSetOfArticlesToBeSetInState) {
      setArticlesData((prevArticles) => [
        ...prevArticles,
        ...results.pages[pagesFetched].data,
      ]);
      setPagesFetched((pagesFetched) => pagesFetched + 1);
      setWaitingForNewSetOfArticlesToBeSetInState(false);
    }
  });

  // intersection observer
  useIntersectionObserver({
    root: allArticlesHolderRef,
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
    rootMargin: "0px 0px 400% 0px",
  });

  useEffect(() => {
    if (!isFetchingNextPage && results?.pages[pagesFetched]?.data) {
      // The if condition runs when the next set of articles are fetched and are waiting to be set in state, excluding the initial fetch
      if (articlesData.length > 0) {
        setWaitingForNewSetOfArticlesToBeSetInState(true);
      }
      // After the initial fetch of articles, we directly store them in state and update "pages fetched" state variable
      else {
        setArticlesData((prevArticles) => [
          ...prevArticles,
          ...results.pages[pagesFetched].data,
        ]);
        setPagesFetched((pagesFetched) => pagesFetched + 1);
      }
    }
  }, [isFetchingNextPage, results, articlesData.length, pagesFetched]);

  useEffect(() => {
    const allArticlesHolder = document.getElementById("all-articles-holder");
    // This is to focus the particular element in the page when the page is loaded
    allArticlesHolder?.focus();

    // This is to prevent multiple touches which leads to some weird behaviour where the scroll snap doesn't work properly (gets stuck in the middle)
    allArticlesHolder?.addEventListener("touchstart", (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });

    // This is to remove the scroll bar of articles when all articles holder is scrolled, because if an article is scrolled simultaneously when all articles holder is also scrolling, it leads to some weird behaviour where the scroll snap doesn't work properly (gets stuck in the middle)
    allArticlesHolder?.addEventListener("scroll", () => {
      showScrollbarOnlyIfArticleIsInViewport();
    });
  }, []);

  return (
    <div
      tabIndex={1} // This makes sure this is the first element to be focused
      id="all-articles-holder"
      ref={allArticlesHolderRef}
      className="w-full relative overflow-y-auto outline-none"
      style={{
        maxHeight: isInPwaMode ? "100vh" : "100dvh",
      }}
    >
      {/* Top bar */}
      <TopBar onClickIcon={scrollAllArticlesHolderToTop} />
      {/* Articles holder */}
      <Holder
        className={`${
          (isError || isLoading || isRefetchError) &&
          "w-full flex items-center justify-center"
        }`}
        otherStyles={{
          height: isInPwaMode ? "100vh" : "100dvh",
        }}
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
                    className="article-holder snap-always snap-center p-4"
                    otherStyles={{
                      minHeight: isInPwaMode ? "100vh" : "100dvh",
                    }}
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
                        : "It seems that no summary has been generated for this article. We apologize for the inconvenience."
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
                        : "na"
                    }
                    emotion={
                      article.predicted_emotion
                        ? article.predicted_emotion
                        : "na"
                    }
                    tabIndexStart={curTabIndexStartValue}
                    isFetchingNewArticles={
                      isFetchingNextPage ||
                      waitingForNewSetOfArticlesToBeSetInState
                    }
                  />
                </CarouselProvider>
              );
            })}

            {!hasNextPage ? (
              // If there are no articles in DB
              articlesData.length === 0 ? (
                <div
                  className="w-full flex items-center justify-center text-white"
                  style={{
                    height: isInPwaMode ? "100vh" : "100dvh",
                  }}
                >
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
                {/* This ref is separate to make sure the next set of articles are loaded as soon as the user comes closer to the last fetched article */}
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
