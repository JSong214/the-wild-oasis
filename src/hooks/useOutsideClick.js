import { useEffect, useRef } from "react";

export default function useOutsideClick(handle, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClose(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handle();
      }
    }
    document.addEventListener("click", handleClose, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClose, listenCapturing);
  }, [handle, listenCapturing]);

  return ref;
}
