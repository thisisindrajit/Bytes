import { FC, Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => any;
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {/* Close button */}
                  <div
                    onClick={onClose}
                    className="text-red-500 cursor-pointer"
                  >
                    Close
                  </div>
                </div>
                {/* Modal content goes here */}
                <div className="my-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfoModal;
