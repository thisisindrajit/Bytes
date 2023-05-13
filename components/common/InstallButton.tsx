import { ReactNode, FC, useState, useEffect } from "react";

interface InstallButtonProps {
  children: ReactNode;
}

const InstallButton: FC<InstallButtonProps> = ({ children }) => {
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    // beforeinstallprompt will only be fired when the below condition is true:
    // - The PWA must not already be installed
    window.addEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return promptInstall ? <div onClick={onClick}>{children}</div> : null;
};

export default InstallButton;
