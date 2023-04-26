import Image from "next/image";
import { FC, useState } from "react";
import Loading from "../common/Loading";
import InfoModal from "../common/InfoModal";

interface SentimentHolderProps {
  sentiment: string;
}

const SentimentHolder: FC<SentimentHolderProps> = ({ sentiment }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isSentimentInfoModalOpen, setIsSentimentInfoModalOpen] =
    useState(false);

  const showSentiment = (sentiment: string) => {
    switch (sentiment) {
      case "pos":
        return "/images/emojis/pos.png";
      case "neg":
        return "/images/emojis/neg.png";
      case "neu":
        return "/images/emojis/neu.png";
      default:
        return "/images/emojis/neu.png";
    }
  };

  const returnSentimentValue = (sentiment: string) => {
    switch (sentiment) {
      case "pos":
        return "Positive";
      case "neg":
        return "Negative";
      case "neu":
        return "Neutral";
      default:
        return "Neutral";
    }
  };

  return (
    <>
      {isSentimentInfoModalOpen && (
        <InfoModal
          isOpen={isSentimentInfoModalOpen}
          onClose={() => setIsSentimentInfoModalOpen(false)}
          title="Predicted Sentiment"
        >
          <div>
            BQ Prime’s special research section collates quality and in-depth
            equity and economy research reports from across India’s top
            brokerages, asset managers and research agencies. These reports
            offer BQ Prime’s subscribers an opportunity to expand their
            understanding of companies, sectors and the economy. BQ Prime’s
            special research section collates quality and in-depth equity and
            economy research reports from across India’s top brokerages, asset
            managers and research agencies. These reports offer BQ Prime’s
            subscribers an opportunity to expand their understanding of
            companies, sectors and the economy. ICICI Securities Report Bajaj
            Auto Ltd. has reported stronger-than-expected Q4 FY23 earnings, both
            at revenue and profitability levels, resulting in 9% beat on
            consensus Ebitda. Revenue was up 12% YoY at Rs 89 billion, driven
            mainly by mix improvement and pricing, resulting in ~27% jump in
            average selling price YoY as against 12% decline in volume. Mix
            improvement was driven by lower sales of export two-wheelers with
            corresponding increase in domestic sports bike mix and domestic
            three-wheeler sales mix. Bajaj Auto's exports retails have started
            to improve from February lows and are improving since then, implying
            better export volume in Q1 FY24 and potential reversal in product
            mix. Models co-developed with Triumph would witness global launch in
            June end and subsequently get retailed in India from H2 CY23. We are
            increasing our FY24/25 Ebitda estimates by ~4% mainly driven by an
            increase in average selling price estimates and a slight increase in
            Ebitdam by ~20-30 bps. Click on the attachment to read the full
            report: ICICI Securities Bajaj Auto Q4FY23 Results Review.pdf View
            Document More Research Reports On Bajaj Auto's Q4 FY23 Results
            Review Margins To Bottom Out: Yes Securities Focused On
            Profitability: Dolat Capital Above Estimate; Strong Product Mix
            Drives All-Round Beat: Motilal Oswal DISCLAIMER This report is
            authored by an external party. BQ Prime does not vouch for the
            accuracy of its contents nor is responsible for them in any way. The
            contents of this section do not constitute investment advice. For
            that you must always consult an expert based on your individual
            needs. The views expressed in the report are that of the author
            entity and do not represent the views of BQ Prime. Users have no
            license to copy, modify, or distribute the content without
            permission of the Original Owner.
          </div>
        </InfoModal>
      )}
      <div
        className="bg-[#303030] rounded p-2 lg:p-4 h-32 lg:h-full overflow-y-auto text-white cursor-pointer hover:bg-[#525252]"
        onClick={() => setIsSentimentInfoModalOpen(true)}
      >
        <div className="flex flex-col min-h-full h-fit gap-2">
          <div className="text-xs lg:text-sm text-[#ecd9cb] uppercase">
            Sentiment
          </div>
          <div className="flex-1 flex lg:flex-col items-center justify-center gap-4 lg:gap-2 lg:my-4 emojis-holder">
            {!isImageLoaded && (
              <Loading
                heightAndWidthClassesForLoadingIcon="h-8 w-8 lg:h-16 lg:w-16"
                noText
              />
            )}
            <div
              className={`${
                isImageLoaded ? "block" : "hidden"
              } relative h-16 w-16 lg:h-24 lg:w-24 xl:h-32 xl:w-32 3xl:h-48 3xl:w-48 emoji-holder`}
            >
              <Image
                src={showSentiment(sentiment)}
                alt={`${returnSentimentValue(sentiment)} icon`}
                fill={true}
                className="self-center"
                onLoadingComplete={() => {
                  setIsImageLoaded(true);
                }}
                priority
              />
            </div>
            {isImageLoaded && (
              <div className="hidden md:flex my-2 text-center text-white text-sm xl:text-base items-center justify-center gap-2 value-holder">
                <span className="text-[#ecd9cb]">•</span>
                <span>{returnSentimentValue(sentiment)}</span>
                <span className="text-[#ecd9cb]">•</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SentimentHolder;
