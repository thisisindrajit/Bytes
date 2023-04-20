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
          totalSlides={3}
          touchEnabled={false}
        >
          <ArticleHolder
            id="1"
            className="min-h-screen snap-center p-4"
            hasPrevious={false}
            hasNext={true}
            imgUrl="https://static.independent.co.uk/2023/04/19/19/Facebook-Settlement_38212.jpg?width=1200&auto=webp"
            articleUrl="https://www.independent.co.uk/news/facebook-settlement-privacy-meta-how-to-claim-b2323197.html"
            prevId={null}
            nextId="2"
            title="Are you a Facebook user? You could get some settlement cash"
            description="Meta has agreed to pay Facebook users $725m privacy settlement"
            pubDate="2023-04-20 05:12:44"
            aiSummary="Facebook users with accounts between May 2007 and December 2022 can apply for a share of Meta's $725 million privacy settlement. Meta agreed to this payment in December after a four-year class action lawsuit accused the company of letting millions of users' personal information be accessed by Cambridge Analytica. This data analytics firm supported Donald Trump's 2016 presidential campaign. A claim form is now available for eligible users to apply for their share of the settlement."
          />
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={3}
          touchEnabled={false}
        >
          <ArticleHolder
            id="2"
            className="min-h-screen snap-center p-4"
            hasPrevious={true}
            hasNext={true}
            pubDate="2023-04-20 05:12:44"
            imgUrl="https://static.independent.co.uk/2023/04/20/03/e1fbbadc8c8f418574efd7e9fb3139a3Y29udGVudHNlYXJjaGFwaSwxNjgyMDM4NDk5-2.33243394.jpg?width=1200&auto=webp"
            articleUrl="https://www.independent.co.uk/news/facebook-settlement-privacy-meta-how-to-claim-b2323197.html"
            prevId="1"
            nextId="3"
            title="India takes “Quantum” jump, Cabinet approves National
            Quantum Mission: Dr Jitendra"
            description="Excelsior Correspondent NEW DELHI, Apr 19: As a historic
            landmark in the nine years of the Modi regime,the Union
            Cabinet, chaired by Prime Minister Narendra Modi, today
            approved the “National Quantum Mission” (NQM) at a total
            cost of Rs.6003.65 crore from 2023-24 to 2030-31, aiming
            to seed, nurture and scale up scientific and industrial
            R&D and create a vibrant & innovative ecosystem in Quantum
            Technology (QT). This will accelerate QT led economic
            growth, nurture the ecosystem in the country and […] The
            post India takes “Quantum” jump, Cabinet approves National
            Quantum Mission: Dr Jitendra appeared first on Jammu
            Kashmir Latest News | Tourism | Breaking News J&K."
            aiSummary="Facebook users with accounts between May 2007 and December 2022 can apply for a share of Meta's $725 million privacy settlement. Meta agreed to this payment in December after a four-year class action lawsuit accused the company of letting millions of users' personal information be accessed by Cambridge Analytica. This data analytics firm supported Donald Trump's 2016 presidential campaign. A claim form is now available for eligible users to apply for their share of the settlement."
          />
        </CarouselProvider>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={false}
          totalSlides={3}
          touchEnabled={false}
        >
          <ArticleHolder
            id="3"
            className="min-h-screen snap-center p-4"
            hasPrevious={true}
            hasNext={false}
            imgUrl={null}
            pubDate="2023-04-20 05:12:44"
            articleUrl="https://www.independent.co.uk/news/facebook-settlement-privacy-meta-how-to-claim-b2323197.html"
            prevId="2"
            nextId={null}
            title="India takes “Quantum” jump, Cabinet approves National
            Quantum Mission: Dr Jitendra"
            description="Excelsior Correspondent NEW DELHI, Apr 19: As a historic
            landmark in the nine years of the Modi regime,the Union
            Cabinet, chaired by Prime Minister Narendra Modi, today
            approved the “National Quantum Mission” (NQM) at a total
            cost of Rs.6003.65 crore from 2023-24 to 2030-31, aiming
            to seed, nurture and scale up scientific and industrial
            R&D and create a vibrant & innovative ecosystem in Quantum
            Technology (QT). This will accelerate QT led economic
            growth, nurture the ecosystem in the country and […] The
            post India takes “Quantum” jump, Cabinet approves National
            Quantum Mission: Dr Jitendra appeared first on Jammu
            Kashmir Latest News | Tourism | Breaking News J&K."
            aiSummary="Facebook users with accounts between May 2007 and December 2022 can apply for a share of Meta's $725 million privacy settlement. Meta agreed to this payment in December after a four-year class action lawsuit accused the company of letting millions of users' personal information be accessed by Cambridge Analytica. This data analytics firm supported Donald Trump's 2016 presidential campaign. A claim form is now available for eligible users to apply for their share of the settlement."
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
