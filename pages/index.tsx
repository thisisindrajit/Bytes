import Holder from "@/components/common/Holder";
import TopBar from "@/components/common/TopBar";
import ArticleHolder from "@/components/news/ArticleHolder";
import { CarouselProvider } from "pure-react-carousel";
import { useEffect } from "react";

const Home = () => {
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
          lockOnWindowScroll
        >
          <ArticleHolder
            id="1"
            className="min-h-screen snap-center p-4"
            hasPrevious={false}
            hasNext={true}
            imgUrl={null}
            prevId={null}
            nextId="2"
          />
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={2}
          lockOnWindowScroll
        >
          <ArticleHolder
            id="2"
            className="min-h-screen snap-center p-4"
            hasPrevious={true}
            hasNext={true}
            imgUrl="https://i0.wp.com/www.orissapost.com/wp-content/uploads/2022/09/Harvard-startup-EV.jpg?fit=300%2C200=1"
            prevId="1"
            nextId="3"
          />
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={2}
          lockOnWindowScroll
        >
          <ArticleHolder
            id="3"
            className="min-h-screen snap-center p-4"
            hasPrevious={true}
            hasNext={false}
            imgUrl={null}
            prevId="2"
            nextId={null}
          />
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
