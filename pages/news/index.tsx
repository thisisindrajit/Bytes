import Holder from "@/components/common/Holder";
import TopBar from "@/components/common/TopBar";

const NewsPage = () => {
  const showInView = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="news-holder max-h-screen w-full relative overflow-y-auto">
      <TopBar />
      <Holder>
        <div id="1" className="min-h-screen snap-center p-4">
          <div className="pt-12">This is article 1</div>
          <div onClick={() => showInView("2")}>Next</div>
        </div>
        <div id="2" className="min-h-screen snap-center p-4">
          <div className="pt-12">This is article 2</div>
          <div onClick={() => showInView("1")}>Previous</div>
          <div onClick={() => showInView("3")}>Next</div>
        </div>
        <div id="3" className="min-h-screen snap-center p-4">
          <div className="pt-12">This is article 3</div>
          <div onClick={() => showInView("2")}>Previous</div>
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
