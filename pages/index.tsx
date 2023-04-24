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
import iconVLite from "iconv-lite";

const Home = () => {
  const loadMoreRef: any = useRef(null);
  const [pagesFetched, setPagesFetched] = useState<number>(0);
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  let curTabIndexStartValue = 2;

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

    const allArticles = await response.json();

    return allArticles;
  };

  const scrollToTop = () => {
    document.getElementById("all-articles-holder")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cleanIfSourceIsMoneycontrol = (input: string) => {
    // This is done to correct text from moneycontrol because it uses a different encoding
    let modifiedInput = input.replaceAll("#39;", "&#39;");
    let encodedInput = iconVLite.encode(modifiedInput, "windows-1252");

    return decode(iconVLite.decode(encodedInput, "utf-8").toString());
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
    enabled: !!hasNextPage,
  });

  useEffect(() => {
    if (!isFetchingNextPage && results) {
      const curPageFetched = pagesFetched + 1;
      if (results.pages[curPageFetched - 1]?.data) {
        setArticlesData([
          ...articlesData,
          ...results.pages[curPageFetched - 1].data,
        ]);
        setPagesFetched(curPageFetched);
        // const firstIdOfCurPage = results.pages[curPageFetched - 1].data[0].id;
        // document.getElementById(firstIdOfCurPage)?.scrollTo({
        //   top: 0,
        //   behavior: "instant",
        // });
      }
    }
  }, [isFetchingNextPage, results]);

  useEffect(() => {
    // This is to focus the particular element in the page when the page is loaded
    document.getElementById("all-articles-holder")?.focus();
  }, []);

  return (
    <div
      tabIndex={1} // This makes sure this is the first element to be focused
      id="all-articles-holder"
      className="max-h-screen w-full relative overflow-y-auto outline-none"
    >
      <TopBar onClickIcon={scrollToTop} />
      <Holder
        className={`${
          (isError || isLoading || isRefetchError) &&
          "h-screen w-full flex items-center justify-center"
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
                  touchEnabled={true}
                  dragEnabled={false}
                >
                  <ArticleHolder
                    id={article.id}
                    className="min-h-screen snap-center p-4"
                    hasPrevious={index === 0 ? false : true}
                    hasNext={index === articlesData.length - 1 ? false : true}
                    prevId={articlesData[index - 1]?.id}
                    nextId={articlesData[index + 1]?.id}
                    title={
                      article.source === "moneycontrol"
                        ? cleanIfSourceIsMoneycontrol(article.title)
                        : article.title
                    }
                    description={
                      article.description
                        ? article.source === "moneycontrol"
                          ? cleanIfSourceIsMoneycontrol(article.description)
                          : article.description
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
                    category={
                      article.category
                        ? JSON.parse(article.category).category
                        : null
                    }
                    creator={
                      article.creator
                        ? JSON.parse(article.creator).creator
                        : null
                    }
                    source={article.source}
                    country={
                      article.country
                        ? JSON.parse(article.country).country
                        : null
                    }
                    keywords={
                      article.keywords
                        ? JSON.parse(article.keywords).keywords
                        : null
                    }
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
            {/* If there are no articles in DB */}
            {!hasNextPage ? (
              articlesData.length === 0 ? (
                <div className="h-screen w-full flex items-center justify-center text-white">
                  No articles available! 🥺
                </div>
              ) : (
                <div className="bg-[#ecd9cb] flex items-center justify-center p-6">
                  You have viewed all articles! 🎉
                </div>
              )
            ) : (
              <div ref={loadMoreRef}>
                {!isFetchingNextPage ? (
                  <div className="bg-white flex items-center justify-center">
                    <Loading
                      heightAndWidthClassesForLoadingIcon="h-8 w-8"
                      loadingText="Fetching more articles..."
                      className="text-sm lg:text-base m-6"
                      color="black"
                    />
                  </div>
                ) : null}
              </div>
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
      <style jsx>
        {`
          #all-articles-holder {
            scroll-snap-type: y mandatory;
            scroll-snap-stop: always;
            scrollbar-width: none; /* Firefox */
          }
          #all-articles-holder::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}
      </style>
    </div>
  );
};

export default Home;
