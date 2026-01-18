import { useEffect, useRef, useState } from "react";

const useFullScreen = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const goFullscreen = () => {
    const element = ref.current;

    if (element) {
      if (element.requestFullscreen) {
        setIsFullscreen(true);
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        /* Safari */
        setIsFullscreen(true);
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        /* IE11 */
        setIsFullscreen(true);
        (element as any).msRequestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else if ((document as any).webkitExitFullscreen) {
      /* Safari */
      (document as any).webkitExitFullscreen();
      setIsFullscreen(false);
    } else if ((document as any).msExitFullscreen) {
      /* IE11 */
      (document as any).msExitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      screen.orientation.lock("landscape-primary");
    } else {
      screen.orientation.unlock();
    }

    return () => {
      screen.orientation.unlock();
    };
  }, [isFullscreen]);

  return {
    ref,
    isFullscreen,
    goFullscreen,
    exitFullscreen,
  };
};

export default useFullScreen;
