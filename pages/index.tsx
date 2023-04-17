import AnimatedBackground from "@/components/common/AnimatedBackground";
import Image from "next/image";

const Home = () => {
  return (
    <AnimatedBackground>
      <div className="p-3 bg-white w-fit flex items-center justify-center gap-2.5">
        <div className="relative h-5 w-5">
          <Image src="/images/logo.png" alt="bytes logo" fill={true} priority />
        </div>
        <div className="text-sm uppercase tracking-[0.25em]">Bytes</div>
      </div>
    </AnimatedBackground>
  );
};

export default Home;
