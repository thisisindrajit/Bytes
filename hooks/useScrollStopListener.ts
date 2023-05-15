import { useEffect, useRef } from "react";

const createScrollStopListener = (element, callback, timeout) => {
  let removed: boolean = false;
  let handle: NodeJS.Timeout | null = null;

  const onScroll = () => {
    if (handle) {
      clearTimeout(handle);
    }

    handle = setTimeout(callback, timeout);
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

const useScrollStopListener = (callback, timeout = 300) => {
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
      },
      timeout // default timeout is 300 ms, which means the callback function will be fired after 300 ms of no scrolling
    );
    return () => destroyListener();
  }, [containerRef.current]);

  return containerRef;
};

export default useScrollStopListener;
