import { useState, useEffect, ReactNode, FC } from "react";
import Loading from "./Loading";

interface InstallButtonProps {
  page?: string;
  children: ReactNode;
  errorElement?: ReactNode;
}

const InstallButton: FC<InstallButtonProps> = ({
  children,
  page,
  errorElement,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
      setIsLoading(false);
    };

    // beforeinstallprompt will only be fired when the below condition is true:
    // - The PWA must not already be installed
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return page === "install" ? (
    isLoading ? (
      <Loading
        heightAndWidthClassesForLoadingIcon="h-7 w-7"
        className="m-auto text-white mb-8"
      />
    ) : supportsPWA ? (
      <div onClick={onClick}>{children}</div>
    ) : (
      <>{errorElement}</>
    )
  ) : supportsPWA ? (
    <div onClick={onClick}>{children}</div>
  ) : null;
};

export default InstallButton;
