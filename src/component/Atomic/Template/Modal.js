import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { CrossCancel } from "../Atoms";

const Modal = ({
  open,
  title = "Give a title",
  children,
  customPanelClasses,
  headerSection,
}) => {
  const closeModal = () => {
    open?.setIsOpen(false);
  };

  return (
    <div>
      <Transition appear show={open?.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel
                  className={`w-full transform overflow-hidden p-6 text-center align-middle shadow-xl transition-all ${customPanelClasses}`}
                >
                  {" "}
                  {/** rounded-2xl bg-white */}
                  {headerSection ? (
                    <div className="flex justify-between items-center">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>

                      <div className="">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-right"
                          onClick={closeModal}
                        >
                          <CrossCancel />
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div className="mt-3">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
