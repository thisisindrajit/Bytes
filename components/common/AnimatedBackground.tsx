import { FC, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children?: ReactNode;
}

const AnimatedBackground: FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <div className="animated-background min-h-screen w-full">
      {children}
      <style jsx>
        {`
          .animated-background {
            background: linear-gradient(-45deg, #ae8b69, #bcab8a, #ecd9cb);
            background-size: 250% 250%;
            -webkit-animation: gradient-animation 25s ease infinite;
            -moz-animation: gradient-animation 25s ease infinite;
            animation: gradient-animation 25s ease infinite;
          }

          .paused {
            -webkit-animation-play-state: paused; /* Safari 4.0 - 8.0 */
            animation-play-state: paused;
          }

          @-webkit-keyframes gradient-animation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @-moz-keyframes gradient-animation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes gradient-animation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedBackground;
