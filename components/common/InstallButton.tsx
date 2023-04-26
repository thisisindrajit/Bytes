import { useState, useEffect, ReactNode, FC } from "react";

interface InstallButtonProps {
  children: ReactNode;
}

const InstallButton: FC<InstallButtonProps> = ({ children }) => {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
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

  return supportsPWA ? <div onClick={onClick}>{children}</div> : null;
};

export default InstallButton;
