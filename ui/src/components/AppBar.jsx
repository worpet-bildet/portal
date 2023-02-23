import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import { getSelectedSection, useStore } from "../state/store";
import { useUrbit, usePortal } from "../state/usePortal";

const navigation = [
  { name: "Home", href: "#", highlightOnSelect: true, section: "all" },
  { name: "Groups", href: "#", highlightOnSelect: true, section: "group" },
  { name: "Apps", href: "#", highlightOnSelect: true, section: "app" },
  {
    name: "Feedback",
    href: "web+urbitgraph://group/~toptyr-bilder/portal",
    highlightOnSelect: false,
    section: "all",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const setSelectedSection = useStore(state => state.setSelectedSection);
  const selectedSection = useStore(getSelectedSection);
  const sectionToggled = ({ section, highlightOnSelect }) => {
    return selectedSection === section && highlightOnSelect;
  };

  const handleSectionChange = (evt, item) => {
    evt.preventDefault();
    item.highlightOnSelect && setSelectedSection(item.section.toLowerCase());
  };

  const mySigil = () => {
    // TODO: check this works when signed in on a ship
    const [myShip, setMyShip] = useState();
    const { ship } = usePortal();
    useEffect(() => {
      if (ship) setMyShip(ship);
    }, [ship]);
    // sigil-js can't render moons
    if (myShip && myShip.length > "13") return <></>;
    return (
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
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-5 lg:px-44">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                  <div
                    className="flex flex-shrink-0 items-center cursor-pointer pl-2"
                    onClick={() => setSelectedSection("all")}
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
                    <h2 className="flex flex-1 text-lg font-michroma leading-8 pl-2 pb-1 tracking-tight text-white cursor-pointer">
                      Portal
                    </h2>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <a
                        onClick={evt => handleSectionChange(evt, item)}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          sectionToggled(item)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={sectionToggled(item) ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <div>{mySigil()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden text-right">
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
