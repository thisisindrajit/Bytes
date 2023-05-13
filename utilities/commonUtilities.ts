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
  console.error("t");
  document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
};

export const isPwa = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator["standalone"] ||
    document.referrer.includes("android-app://") ||
    document.referrer.includes("ios-app://")
  );
};
