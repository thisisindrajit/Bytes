import Holder from "@/components/common/Holder";
import TopBar from "@/components/common/TopBar";

const NewsPage = () => {
  return (
    <div className="news-holder max-h-screen w-full relative overflow-y-auto">
      <TopBar />
      <Holder>
        <div className="min-h-screen snap-start p-4">
          <div className="pt-12">This is article 1</div>
        </div>
        <div className="min-h-screen snap-start p-4">
          <div className="pt-12">This is article 2</div>
        </div>
        <div className="min-h-screen snap-start p-4">
          <div className="pt-12">This is article 3</div>
        </div>
      </Holder>
      <style jsx>
        {`
          .news-holder {
            scroll-snap-type: y mandatory;
            scroll-snap-stop: always;
            scrollbar-width: none; /* Firefox */
          }
          .news-holder::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}
      </style>
    </div>
  );
};

export default NewsPage;
