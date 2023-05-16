import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <div className={`animated-background w-full min-h-[100svh]`}>
      {children}
    </div>
  );
};

export default AnimatedBackground;
