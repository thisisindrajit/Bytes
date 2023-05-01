export const showEmotion = (emotion: string) => {
  switch (emotion) {
    case "anger":
      return "/images/emojis/anger.png";
    case "disgust":
      return "/images/emojis/disgust.png";
    case "fear":
      return "/images/emojis/fear.png";
    case "joy":
      return "/images/emojis/joy.png";
    case "sadness":
      return "/images/emojis/sadness.png";
    case "surprise":
      return "/images/emojis/surprise.png";
    case "neutral":
      return "/images/emojis/neutral.png";
    default:
      return "/images/emojis/neutral.png";
  }
};

export const returnEmotionValue = (emotion: string) => {
  switch (emotion) {
    case "anger":
      return "Anger";
    case "disgust":
      return "Disgust";
    case "fear":
      return "Fear";
    case "joy":
      return "Joy";
    case "sadness":
      return "Sadness";
    case "surprise":
      return "Surprise";
    case "neutral":
      return "Neutral";
    default:
      return "Neutral";
  }
};
