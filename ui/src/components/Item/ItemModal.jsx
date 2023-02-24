import React from "react";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ItemImage } from "./ItemImage";

export function ItemModal({
  title,
  path,
  image,
  description,
  website,
  pictures,
  tags,
  type,
  onRequestClose,
}) {
  const [open, setOpen] = useState(true);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const cancelButtonRef = useRef();
  const imageContainerRef = useRef();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onRequestClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-offwhite text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <button
                  type="button"
                  className="absolute top-0 right-0 pt-4 pr-4"
                  onClick={onRequestClose}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="bg-black text-offwhite px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start sm:pb-5">
                    <div className="w-full flex flex-row justify-start pt-4 align-middle"> 
                    {/* TODO: make align-middle actually put image vertically centered between title + path  */}
                      <div
                        className="w-1/4 h-1/4 rounded-lg overflow-hidden" 
                        ref={imageContainerRef}
                      >
                        <ItemImage
                          src={image || title}
                          type={type}
                          container={imageContainerRef}
                        ></ItemImage>
                      </div>
                      <div className="w-2/3 sm:mt-0 sm:ml-4 text-left px-2">
                        <Dialog.Title className="text-lg font-medium leading-6 text-left">
                          {title}
                        </Dialog.Title>
                        <div>
                          <a
                            href={website}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            {path}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 pb-5">
                      <p className="text-sm text-gray-400">{description}</p>
                    </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {/* <p className="w-2/3 text-xs text-blue-600 pr-4 absolute sm:bottom-4 sm:left-4 bottom-2 left-2">We sent a request for you to join. Open the Groups app to get started. </p> */}
                  <button
                    type="button"
                    className="inline-flex w-1/3 justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto sm:text-sm absolute sm:bottom-4 sm:right-4 bottom-2 right-2"
                    onClick={() => {onRequestClose(); setAlertIsOpen(true);}}
                  >
                    {type === "app" ? "Install" : "Join"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
