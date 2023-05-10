export const showSentiment = (sentiment: string) => {
  switch (sentiment) {
    case "pos":
      return "/images/emojis/pos.png";
    case "neg":
      return "/images/emojis/neg.png";
    case "neu":
      return "/images/emojis/neutral.png";
    default:
      return "/images/emojis/not-available.png";
  }
};

export const returnSentimentValue = (sentiment: string) => {
  switch (sentiment) {
    case "pos":
      return "Positive";
    case "neg":
      return "Negative";
    case "neu":
      return "Neutral";
    default:
      return "Not available";
  }
};
