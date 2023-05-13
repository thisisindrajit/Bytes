import { useEffect, useRef } from "react";

const createScrollStopListener = (element, callback, timeout = 200) => {
  let removed: boolean = false;
  let handle: NodeJS.Timeout | null = null;

  const onScroll = () => {
    if (handle) {
      clearTimeout(handle);
    }

    handle = setTimeout(callback, timeout); // default timeout is 200 ms, which means the callback function will be fired after 200 ms of no scrolling
  };

  element.addEventListener("scroll", onScroll);

  return () => {
    if (removed) {
      return;
    }

    removed = true;

    if (handle) {
      clearTimeout(handle);
    }

    element.removeEventListener("scroll", onScroll);
  };
};

const useScrollStopListener = (callback) => {
  const containerRef = useRef<any>(null);
  const callbackRef = useRef<any>(null);

  callbackRef.current = callback;

  useEffect(() => {
    const destroyListener = createScrollStopListener(
      containerRef.current,
      () => {
        if (callbackRef.current) {
          callbackRef.current();
        }
      }
    );
    return () => destroyListener();
  }, [containerRef.current]);

  return containerRef;
};

export default useScrollStopListener;
