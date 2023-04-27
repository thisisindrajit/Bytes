import { FC } from "react";
import ImageHolder from "./ImageHolder";

const BytesInfo: FC = () => {
  return (
    <div className="flex flex-col mt-10 gap-4">
      {/* Logo */}
      <div className="bg-[#ecd9cb] border-2 border-dashed border-black p-6 rounded w-fit self-center">
        <ImageHolder
          heightAndWidthClasses="h-16 w-16 lg:h-28 lg:w-28"
          src={"/images/bytes_logo.png"}
          alt="Bytes logo"
          priority={true}
        />
      </div>
      {/* About */}
      <div className="text-base/loose text-justify mt-4">
        <span>Bytes is a</span>
        <span className="font-bold mx-1.5">
          AI powered progressive web app (PWA)
        </span>
        <span>
          that delivers news to users in an innovative and user-friendly way.
          With its infinite scroll format and
        </span>
        <span className="font-bold mx-1.5">
          AI generated short summaries of articles,
        </span>
        <span>
          Bytes provides users with a fast and easy way to stay up-to-date on
          the latest news and events. Whether you're on the go or simply looking
          for a more efficient way to consume news, Bytes is the perfect
          solution. The app is designed to be intuitive and easy to use, with a
          clean and modern interface that puts the focus squarely on the news.
          Try Bytes today and experience a new way to stay informed!
        </span>
        <div className="mt-6 font-bold">
          <span>Created with ❤️ by</span>
          <a
            href="https://thisisindrajit.github.io/portfolio/"
            className="underline mx-1.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Indrajit
          </a>
        </div>
      </div>
      {/* Horizontal separator */}
      <div className="my-2 h-[1px] w-full bg-green-500"></div>
      <div className="text-base/loose text-justify bg-green-500/20 rounded p-4 text-green-700">
        <div className="mb-2 font-bold underline">A note from the creator</div>
        <div>
          All predictions and summarizations in Bytes are made possible by the
          innovative technology of MindsDB. As the creator of Bytes, I wanted to
          take a moment to express my deep appreciation and gratitude to the
          MindsDB team. Thanks to their cutting-edge technology like AI tables
          and models, Bytes has been able to provide users with accurate
          predictions and concise summarizations, allowing them to stay ahead of
          the game and informed on the latest news and events.
        </div>
      </div>
    </div>
  );
};

export default BytesInfo;
