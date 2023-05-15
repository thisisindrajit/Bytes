import useIsInPwaMode from "@/hooks/useIsInPwaMode";
import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  const { isInPwaMode } = useIsInPwaMode();

  return (
    <div
      className={`animated-background w-full ${
        isInPwaMode ? "min-h-screen" : "min-h-[100dvh]"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
