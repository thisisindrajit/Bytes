import { FC, ReactNode } from "react";
import Modal from "react-responsive-modal";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  fullScreen?: boolean;
  noTitleAndCloseButton?: boolean;
  children?: ReactNode;
}

const InfoModal: FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  fullScreen = false,
  noTitleAndCloseButton = false,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      focusTrapped={false}
      modalId="modal"
      classNames={{
        modal: `outline-none ${
          fullScreen ? "min-h-[100dvh] min-w-full modal-styles" : "rounded"
        }`,
        closeIcon: `${noTitleAndCloseButton ? "hidden" : "mt-[0.15rem]"}`,
      }}
      onAnimationEnd={() => {
        document.getElementById("modal")?.focus({ preventScroll: true });
      }}
    >
      {/* Title */}
      {!noTitleAndCloseButton && <div className="w-fit font-bold">{title}</div>}
      {/* Children */}
      {children}
    </Modal>
  );
};

export default InfoModal;
