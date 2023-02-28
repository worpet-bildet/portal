import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import { useStore } from "../state/store";
import { getSelectedSection, getDefaultCurators } from "../state/selectors";
import { useUrbit, usePortal } from "../state/usePortal";
// import DialogSelect from "./Dialog";

// this is not very nice, it just picks the first item in the default curators
// map to navigate you to. this map is not ordered though, so it might not be
// the same page that you actually landed on.. how to solve.. hmm
function buildNav(curators) {
  return [
    {
      name: "Home",
      href: `/apps/portal/${curators[0] ? curators[0][1].item.keys.keyObj.ship : ""}`,
      // href: `/apps/portal/${curators[0] ? curators[0][1].item.keyObj.ship : ""}`,
      highlightOnSelect: true,
      section: "all",
    },
    // { name: "Groups", href: "#", highlightOnSelect: true, section: "group" },
    // { name: "Apps", href: "#", highlightOnSelect: true, section: "app" },
    // { name: "Add", href: "#", highlightOnSelect: true, section: "all" },
    {
      name: "Feedback",
      href: "web+urbitgraph://group/~toptyr-bilder/portal",
      highlightOnSelect: false,
      section: "all",
    },
  ];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppBar() {
  const curators = useStore(getDefaultCurators);
  const [formOpen, setFormOpen] = useState(false);
  const navigation = buildNav(Object.entries(curators));
  const setSelectedSection = useStore(state => state.setSelectedSection);
  const selectedSection = useStore(getSelectedSection);
  const sectionToggled = ({ section, highlightOnSelect }) => {
    return selectedSection === section && highlightOnSelect;
  };

  // TODO: maybe rethink this
  const handleSectionChange = (evt, item) => {
    // evt.preventDefault();
    // item.highlightOnSelect && setSelectedSection(item.section.toLowerCase());
    // if (item.name === "Add") {
    //   setFormOpen(true);
    // }
  };

  const MySigil = () => {
    // TODO: check this works when signed in on a ship
    let { ship: myShip } = usePortal();
    // sigil-js can't render moons
    return myShip?.length > "13" ? (
      <></>
    ) : (
      <>
        {sigil({
          patp: myShip || "zod",
          renderer: reactRenderer,
          size: "50",
          colors: ["black", "white"],
        })}
      </>
    );
  };

  return (
    <Disclosure as="nav" className="bg-black sticky top-0 z-[100]">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-5 lg:px-24">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-row w-full items-center justify-between">
                <div className="flex flex-row justify-between">
                  <a
                    className="flex items-center cursor-pointer pl-2"
                    href={navigation[0].href}
                  >
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/3d.svg"
                      alt="Portal Logo"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/3d.svg"
                      alt="Portal Logo"
                    />
                    <h2 className="flex flex-1 text-lg font-michroma leading-8 pb-1 pl-2 tracking-tight text-white cursor-pointer">
                      Portal
                    </h2>
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center">
                    {navigation.map(item => (
                      <a
                        onClick={evt => handleSectionChange(evt, item)}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          sectionToggled(item)
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={sectionToggled(item) ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <div>
                      <MySigil />
                    </div>
                    {/* <DialogSelect open={formOpen} setOpen={setFormOpen} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden text-right">
            {/* TODO: make this 1/3 width of screen */}
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(item => (
                <Disclosure.Button
                  onClick={evt => handleSectionChange(evt, item)}
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    sectionToggled(item)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={sectionToggled(item) ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
