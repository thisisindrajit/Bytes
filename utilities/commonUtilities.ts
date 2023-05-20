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

export const isPwa = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator["standalone"] ||
    document.referrer.includes("android-app://") ||
    document.referrer.includes("ios-app://")
  );
};

export const fetchTitleFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const pageTitle = doc.querySelector("title")?.textContent;

    return pageTitle || null;
  } catch (error) {
    console.error("Error fetching website title: ", error);
    return null;
  }
};
