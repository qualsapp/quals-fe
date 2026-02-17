"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import useFullScreen from "@/hooks/use-full-screen";

type Props = {
  children?: React.ReactNode;
};

const FullScreenWrapper = ({ children }: Props) => {
  const { ref, isFullscreen, goFullscreen, exitFullscreen } = useFullScreen();
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center",
        isFullscreen && "h-full w-full fixed inset-0 z-50 bg-white",
      )}
    >
      <div className={cn("", isFullscreen && "rotate-90 w-[100vh] h-[100vw]")}>
        {children}
        {isFullscreen ? (
          <Button onClick={exitFullscreen}>Exit Fullscreen</Button>
        ) : (
          <Button onClick={goFullscreen}>Enter Fullscreen</Button>
        )}
      </div>
    </div>
  );
};

export default FullScreenWrapper;
