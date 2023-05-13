export const getLoadingIconSrcBasedOnColor = (
  color: "black" | "white" | "grey"
) => {
  switch (color) {
    case "black":
      return "/images/svg/loading-black.svg";
    case "white":
      return "/images/svg/loading-white.svg";
    case "grey":
      return "/images/svg/loading-grey.svg";
    default:
      return "/images/svg/loading.svg";
  }
};

export const setDocHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", `${window.innerHeight}px`);
};
