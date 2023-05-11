import { decode } from "html-entities";
import iconVLite from "iconv-lite";

export const scrollToTop = () => {
  document.getElementById("all-articles-holder")?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const showInView = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
};

export const isElementInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= 10;
};

export const cleanIfSourceIsMoneycontrol = (input: string) => {
  // This is done to clean data if source is moneycontrol because it uses a different encoding (Windows 1252)
  let modifiedInput = input.replaceAll("#39;", "&#39;");
  let encodedInput = iconVLite.encode(modifiedInput, "windows-1252");

  return decode(iconVLite.decode(encodedInput, "utf-8"));
};

export const showScrollbarOnlyIfArticleIsInViewport = () => {
  (
    document.querySelectorAll(".article-holder") as NodeListOf<HTMLElement>
  ).forEach((articleHolder) => {
    const articleContentHolders = articleHolder.querySelectorAll(
      ".article-content-holder"
    ) as NodeListOf<HTMLElement>;

    if (isElementInViewport(articleHolder)) {
      articleContentHolders.forEach((ach) => (ach.style.overflowY = "auto"));
    } else {
      articleContentHolders.forEach((ach) => (ach.style.overflowY = "hidden"));
    }
  });
};
