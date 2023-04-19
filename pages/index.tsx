import Holder from "@/components/common/Holder";
import TopBar from "@/components/common/TopBar";
import ArticleHolder from "@/components/news/ArticleHolder";
import { CarouselProvider } from "pure-react-carousel";
import { useEffect } from "react";

const Home = () => {
  const showInView = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // This is to focus the particular element in the page when the page is loaded
    document.getElementById("all-articles-holder")?.focus();
  }, []);

  return (
    <div
      tabIndex={0} // This makes sure this is the first element to be focused
      id="all-articles-holder"
      className="max-h-screen w-full relative overflow-y-auto outline-none"
    >
      <TopBar />
      <Holder>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={2}
        >
          <ArticleHolder id="1" className="min-h-screen snap-center p-4">
            <div onClick={() => showInView("2")}>Next</div>
          </ArticleHolder>
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={2}
        >
          <ArticleHolder id="2" className="min-h-screen snap-center p-4">
            <div onClick={() => showInView("1")}>Previous</div>
            <div onClick={() => showInView("3")}>Next</div>
          </ArticleHolder>
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={2}
        >
          <ArticleHolder id="3" className="min-h-screen snap-center p-4">
            <div onClick={() => showInView("2")}>Previous</div>
          </ArticleHolder>
        </CarouselProvider>
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
