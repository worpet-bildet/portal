import React from "react";
import { Fragment, useRef } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { ItemImage } from "./ItemImage";
import { useGang } from "../../lib/state/groups/groups";
import useGroupJoin from "../../lib/useGroupJoin";

export function ItemModal({
  title,
  path,
  image,
  description,
  website,
  type,
  data,
  buttonDisabled,
  onRequestClose,
}) {
  const cancelButtonRef = useRef();
  const imageContainerRef = useRef();

  const groupInviteObject = useGang(path);
  const { join } = useGroupJoin(path, groupInviteObject, true);
  const getColor = () => data?.bespoke?.payload?.color?.split(".").join("").substring(2);

  const handleAction = evt => {
    if (type === "group" && path?.length) {
      join();
      toast.success(`Joining ${title}...`);
    }
    // open a new tab in grid with the install page
    if (type === "app") {
      const {
        bespoke: {
          keyObj: { ship },
        },
      } = data;
      const uri = `/apps/grid/leap/search/${ship}/apps`;
      window.open(uri);
    }
  };

  function getActionText(type) {
    if (type === "group") return buttonDisabled ? "Joined" : "Join";
    if (type === "app") return "Install";
    if (type === "other") return "Go";
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
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

        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-black text-offwhite text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                    <div className="w-full flex flex-row justify-start pt-4 items-center">
                      <div
                        className="w-1/4 h-1/4 rounded-xl overflow-hidden"
                        ref={imageContainerRef}
                      >
                        <ItemImage
                          src={image || title}
                          type={type}
                          container={imageContainerRef}
                          name={title}
                          color={getColor()}
                        ></ItemImage>
                      </div>
                      <div className="w-2/3 sm:mt-0 sm:ml-4 text-left px-2">
                        <Dialog.Title className="text-lg font-medium leading-6 text-left">
                          {title}
                        </Dialog.Title>
                        <div>
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#0284c7] hover:text-[#0284c7]"
                          >
                            {type !== "other" ? path : ""}
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
                  <button
                    type="button"
                    className={`inline-flex w-1/3 rounded-md px-4 py-2 text-base font-medium text-white shadow-sm  sm:ml-3 sm:w-auto sm:text-sm absolute sm:bottom-4 sm:right-4 bottom-2 right-2 ${
                      buttonDisabled
                        ? "bg-none justify-end"
                        : "bg-[#0284c7] hover:bg-[#0284c7] justify-center"
                    }`}
                    disabled={buttonDisabled}
                    onClick={() => {
                      if (type === "other") {
                        window.open(website);
                      }
                      handleAction();
                      onRequestClose();
                    }}
                  >
                    {getActionText(type)}
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
