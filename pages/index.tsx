import Holder from "@/components/common/Holder";
import Loading from "@/components/common/Loading";
import TopBar from "@/components/common/TopBar";
import ArticleHolder from "@/components/news/ArticleHolder";
import { Article } from "@/interfaces/Article";
import { CarouselProvider } from "pure-react-carousel";
import { Fragment, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const Home = () => {
  let curTabIndexStartValue = 2;

  const getArticles = async (curLastKey: string | null) => {
    const options = {
      method: "GET",
    };

    const response = await fetch(
      curLastKey ? `/api/articles?curLastKey=${curLastKey}` : `/api/articles`,
      options
    );

    if (response.status !== 200) {
      throw "Error fetching articles!";
    }

    const allArticles = await response.json();

    return allArticles;
  };

  const {
    data: results,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["articles"],
    ({ pageParam = null }) => getArticles(pageParam),
    {
      getNextPageParam: (lastAPIQueryData) => {
        return lastAPIQueryData.lastKey ? lastAPIQueryData.lastKey : null;
      },
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

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
      <TopBar />
      <Holder>
        {isError ? (
          <div className="h-screen w-full flex items-center justify-center p-4">
            <span className="text-sm/loose lg:text-base/loose border border-red-500 p-3 rounded text-center text-red-500">
              Error fetching articles! Please try again by refreshing the page!
            </span>
          </div>
        ) : !isLoading && results ? (
          <>
            {results.pages.map((page: any, index: number) => (
              <Fragment key={index}>
                {page.data.map((article: Article, index: number) => {
                  if (index > 0) {
                    curTabIndexStartValue += 5;
                  }

                  return (
                    <CarouselProvider
                      key={index}
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
                        hasNext={index === page.data.length - 1 ? false : true}
                        prevId={page.data[index - 1]?.id}
                        nextId={page.data[index + 1]?.id}
                        title={article.title}
                        description={article.description}
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
                      />
                    </CarouselProvider>
                  );
                })}
              </Fragment>
            ))}
          </>
        ) : (
          <div className="h-screen w-full flex items-center justify-center">
            <Loading
              heightAndWidthClassesForLoadingIcon="h-10 w-10 lg:h-12 lg:w-12"
              loadingText="Fetching articles..."
              className="text-white text-sm lg:text-base"
            />
          </div>
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
