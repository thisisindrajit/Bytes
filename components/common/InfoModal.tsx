import { FC, ReactNode } from "react";
import Modal from "react-responsive-modal";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

const InfoModal: FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      focusTrapped={false}
      classNames={{ modal: "rounded", closeIcon: "mt-[0.15rem]" }}
    >
      {/* Title */}
      <div className="w-fit font-bold">{title}</div>
      {/* Children */}
      {children}
    </Modal>
  );
};

export default InfoModal;
