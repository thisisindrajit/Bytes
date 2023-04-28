import BytesInfo from "@/components/common/BytesInfo";
import Holder from "@/components/common/Holder";
import InstallButton from "@/components/common/InstallButton";
import TopBar from "@/components/common/TopBar";
import { useRouter } from "next/router";
import { FC } from "react";

const Install: FC = () => {
  const router = useRouter();

  const errorElement: JSX.Element = (
    <div className="mb-4 p-4 border border-white-500 rounded text-white text-base/loose text-center w-full">
      You have already installed Bytes 🥳 or your device doesn't support PWA 🥺
    </div>
  );

  return (
    <div className="max-h-screen w-full relative overflow-y-auto">
      {/* Top bar */}
      <TopBar page="install" onClickIcon={() => router.push("/")} />
      <Holder className="flex flex-col items-center justify-center">
        <div className="mt-20 mb-8 md:mt-24 md:mb-12 max-w-[90vw] lg:max-w-[75vw]">
          {/* Install button */}
          <InstallButton page="install" errorElement={errorElement}>
            <button className="mb-4 p-4 bg-[#ecd9cb] cursor-pointer rounded w-full">
              Install Bytes
            </button>
          </InstallButton>
          {/* Details holder */}
          <div className="bg-white p-4 pt-2 md:p-6 md:pt-2 rounded">
            <BytesInfo />
          </div>
        </div>
      </Holder>
    </div>
  );
};

export default Install;
