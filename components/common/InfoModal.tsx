import { FC, Fragment, ReactNode, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
  const childRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" initialFocus={childRef} className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" ref={childRef}>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
            <Dialog.Panel className="w-full lg:max-w-[calc(80vw)] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              {/* Title and close button */}
              <div className="flex items-center justify-between">
                {/* Title */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-black capitalize"
                >
                  {title}
                </Dialog.Title>
                {/* Close button */}
                <div onClick={onClose} className="text-red-500 cursor-pointer">
                  | X |
                </div>
              </div>
              {/* Modal content goes here */}
              <div>{children}</div>
            </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfoModal;
