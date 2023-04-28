import { useState, ReactNode, FC, useMemo } from "react";
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
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const promptInstall = () => {
    if (promptEvent) {
      promptEvent.prompt();
    }
  };

  const handleBeforeInstallPrompt = (e: any) => {
    e.preventDefault();
    setPromptEvent(e);
    setIsLoading(false);
  };

  useMemo(() => {
    let supportsPWA = false;

    try {
      supportsPWA = 'serviceWorker' in navigator && 'PushManager' in window;
    } catch (error) {
      console.log('Error checking for PWA support: ', error);
    }

    setSupportsPWA(supportsPWA);

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      }
    };
  }, []);

  return page === "install" ? (
    isLoading ? (
      <Loading
        heightAndWidthClassesForLoadingIcon="h-7 w-7"
        className="m-auto text-white mb-8"
      />
    ) : supportsPWA ? (
      <div onClick={promptInstall}>{children}</div>
    ) : (
      <>{errorElement}</>
    )
  ) : supportsPWA ? (
    <div onClick={promptInstall}>{children}</div>
  ) : (
    <div>Test</div>
  );
};

export default InstallButton;
