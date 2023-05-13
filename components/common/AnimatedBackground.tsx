import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <div
      className="animated-background w-full"
      style={{
        minHeight: "var(--vh, 100dvh)",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
