import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <div className="animated-background min-h-[100dvh] w-full">
      {children}
    </div>
  );
};

export default AnimatedBackground;
