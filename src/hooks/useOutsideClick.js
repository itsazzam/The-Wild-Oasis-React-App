import { useEffect, useRef } from "react";

export default function useOutsideClick(closeFunc, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        closeFunc();
      }
    }
    // listen for the capture phase to prevent the event from bubbling
    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
  }, [closeFunc, ref, listenCapturing]);

  return ref;
}
