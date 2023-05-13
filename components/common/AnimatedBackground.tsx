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
        minHeight: isInPwaMode ? "var(--100vh)" : "var(--100vh, 100dvh)",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
