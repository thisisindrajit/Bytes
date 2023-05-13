import useIsInPwaMode from "@/hooks/useIsInPwaMode";
import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  const { isInPwaMode } = useIsInPwaMode();

  return (
    <div
      className="animated-background w-full"
      style={{
        minHeight: isInPwaMode ? "var(--vh, 100vh)" : "var(--vh, 100dvh)",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
