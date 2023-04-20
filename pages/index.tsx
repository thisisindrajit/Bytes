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
      tabIndex={1} // This makes sure this is the first element to be focused
      id="all-articles-holder"
      className="max-h-screen w-full relative overflow-y-auto outline-none"
    >
      <TopBar />
      <Holder>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={3}
          touchEnabled={true}
          dragEnabled={false}
        >
          <ArticleHolder
            id="1"
            className="min-h-screen snap-center p-4"
            hasPrevious={false}
            hasNext={true}
            prevId={null}
            nextId="2"
            title="Are you a Facebook user? You could get some settlement cash"
            description="Meta has agreed to pay Facebook users $725m privacy settlement"
            pubDate="2023-04-20 05:12:44"
            imgUrl="https://static.independent.co.uk/2023/04/19/19/Facebook-Settlement_38212.jpg?width=1200&auto=webp"
            articleUrl="https://www.independent.co.uk/news/facebook-settlement-privacy-meta-how-to-claim-b2323197.html"
            summary="Facebook users with accounts between May 2007 and December 2022 can apply for a share of Meta's $725 million privacy settlement. Meta agreed to this payment in December after a four-year class action lawsuit accused the company of letting millions of users' personal information be accessed by Cambridge Analytica. This data analytics firm supported Donald Trump's 2016 presidential campaign. A claim form is now available for eligible users to apply for their share of the settlement."
            category={["top"]}
            creator={["Chelsea Ritschel"]}
            source="independentUK"
            country={["united kingdom"]}
            keywords={null}
            sentiment="neu"
            emotion="neutral"
            tabIndexStart={2}
          />
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={3}
          touchEnabled={true}
          dragEnabled={false}
        >
          <ArticleHolder
            id="2"
            className="min-h-screen snap-center p-4"
            hasPrevious={true}
            hasNext={true}
            prevId="1"
            nextId="3"
            title="Musk threatens to sue Microsoft over its digital ad changes that won't include Twitter"
            pubDate="2023-04-20 15:06:49"
            imgUrl="https://twt-thumbs.washtimes.com/media/image/2020/09/29/microsoft-results_80521_s1440x1000.jpg?3df6c398ab1dbaf88e0a3d57e9bfedb215a2ccc1"
            articleUrl="https://www.washingtontimes.com/news/2023/apr/20/elon-musk-feuding-microsoft-over-digital-ad-change/?utm_source=RSS_Feed&utm_medium=RSS"
            description="Microsoft is preparing to remove Twitter from its advertising platform, provoking the social media company's billionaire owner Elon Musk to threaten legal action against the Big Tech titan."
            summary="Microsoft plans to remove Twitter from its advertising platform, which has led to billionaire owner Elon Musk threatening legal action against the tech giant. Microsoft's website features a notification stating that it will no longer offer advertising customers the option to use its services for posting on Twitter, starting April 25. However, Microsoft will continue to collaborate with Facebook and Instagram for advertising purposes."
            category={["top"]}
            creator={["Ryan Lovelace"]}
            source="washingtontimes"
            country={["united states of america"]}
            keywords={null}
            sentiment="neu"
            emotion="fear"
            tabIndexStart={7}
          />
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={3}
          touchEnabled={true}
          dragEnabled={false}
        >
          <ArticleHolder
            id="3"
            className="min-h-screen snap-center p-4"
            hasPrevious={true}
            hasNext={false}
            prevId="2"
            nextId={null}
            title="Man killed in hit-and-run crash, Fort Collins police say; Medina Alert issued"
            pubDate="2023-04-19 13:18:24"
            imgUrl={null}
            articleUrl="https://247newsaroundtheworld.com/crime/man-killed-in-hit-and-run-crash-fort-collins-police-say-medina-alert-issued/"
            description="247 News Around The World 247 News Around The World FORT COLLINS, Colo. — A man is dead in Fort Collins following… The post Man killed in hit-and-run crash, Fort Collins police say; Medina Alert issued appeared first on 247 News Around The World."
            summary="A fatal hit-and-run incident occurred in Fort Collins, Colorado, resulting in the death of a pedestrian. The crash took place near Mulberry St. Riverside Ave. Tuesday. Fort Collins police closed down Mulberry St. Riverside Ave. Lemay Ave. It is believed that the pedestrian was struck by at least two different cars, both of which fled the scene without stopping."
            category={["top"]}
            creator={["247 News Around the World"]}
            source="247newsaroundtheworld"
            country={["united kingdom"]}
            keywords={["Crime"]}
            sentiment="neg"
            emotion="fear"
            tabIndexStart={12}
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
