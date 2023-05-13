import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <div
      className="h-screen animated-background w-full"
      style={{
        minHeight: "var(--vh, 100vh)",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
