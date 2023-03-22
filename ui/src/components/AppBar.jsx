import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import { useStore } from "../state/store";
import { getSelectedSection, getDefaultCurators } from "../state/selectors";
import { useUrbit, usePortal } from "../state/usePortal";
import { NavLink } from "react-router-dom";
// import DialogSelect from "./Dialog";
import useGroupJoin from "../lib/useGroupJoin";
import { useGang, useGroupState } from "../lib/state/groups/groups";
// this is not very nice, it just picks the first item in the default curators
// map to navigate you to. this map is not ordered though, so it might not be
// the same page that you actually landed on.. how to solve.. hmm
const GROUP_FLAG = "~worpet-bildet/portal";

function buildNav(myShip) {
  const defaultListUrl = `/list/${encodeURIComponent(
    `/~${myShip}/list/list/2000.1.1`
  )}/edit`;

  const nav = [
    {
      name: "Home",
      href: `/~worpet-bildet`,
      // href: `/${curators[0] ? curators[0][1].item.keys.keyObj.ship : ""}`,
      // href: `/${curators[0] ? curators[0][1].item.keyObj.ship : ""}`,
      highlightOnSelect: false,
      section: "all",
    },
    // { name: "Groups", href: "#", highlightOnSelect: true, section: "group" },
    // { name: "Apps", href: "#", highlightOnSelect: true, section: "app" },
    // { name: "Add", href: "#", highlightOnSelect: true, section: "all" },
    {
      name: "Feedback",
      href: `${window.location.origin}/apps/groups/groups/~worpet-bildet/portal/channels/chat/~worpet-bildet/feedback---support`,
      highlightOnSelect: false,
      section: "all",
    },
  ];
  if (myShip?.length && myShip !== "undefined") {
    nav.push({
      name: "New Post",
      href: defaultListUrl,
      highlightOnSelect: true,
      section: "all",
    });
    nav.push({
      name: "My Profile",
      href: `/~${myShip}`,
      section: "all",
    });
  }
  return nav;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppBar() {
  const [myShip, setMyShip] = useState(null);
  let { urbit, ship } = usePortal();
  const [navigation, setNavigation] = useState(buildNav());
  const gang = useGang(GROUP_FLAG);
  const { group, button, status } = useGroupJoin(GROUP_FLAG, gang);
  // const setSelectedSection = useStore(state => state.setSelectedSection);
  const selectedSection = useStore(getSelectedSection);
  const sectionToggled = ({ section, highlightOnSelect }) => {
    return selectedSection === section && highlightOnSelect;
  };

  useEffect(() => {
    if (!ship) return;
    setMyShip(ship);
  }, [ship]);

  useEffect(() => {
    if (!myShip) return;
    setNavigation(buildNav(myShip));
  }, [myShip]);

  useEffect(() => {
    if (!gang?.preview && !group) {
      useGroupState.getState().search(GROUP_FLAG);
    }
  }, [gang, group]);
  // TODO: maybe rethink this
  const handleSectionChange = (evt, item, button) => {
    evt.preventDefault();
    // item.highlightOnSelect && setSelectedSection(item.section.toLowerCase());
    // if (item.name === "Add") {
    //   setFormOpen(true);
    // }
    if (item.name === "Feedback") {
      if (button?.text === "Go") {
        window.open(item.href, "_blank");
      } else {
        button.action();
      }
    }
  };

  const MySigil = () => {
    // sigil-js can't render moons
    return (
      <a href={"/apps/portal/~" + myShip}>
        {sigil({
          patp: myShip?.length < "14" ? myShip : "worpet-bildet",
          renderer: reactRenderer,
          size: "50",
          colors: ["black", "white"],
        })}
      </a>
    );
  };

  const getNavigationProps = item => {
    return true
      ? { href: item.href }
      : { onClick: evt => handleSectionChange(evt, item) };
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
                  <NavLink
                    className="flex items-center cursor-pointer pl-2"
                    to={navigation[0]?.href}
                    // {...getNavigationProps(navigation[0])}
                  >
                    <img
                      className="block h-12 w-auto lg:hidden"
                      src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/logo2.svg"
                      alt="Portal Logo"
                    />
                    <img
                      className="hidden h-14 w-auto lg:block"
                      src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/logo2.svg"
                      alt="Portal Logo"
                    />
                    <h2 className="flex flex-1 text-lg font-michroma leading-8 pb-1 pl-2 tracking-tight text-white cursor-pointer">
                      Portal
                    </h2>
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center">
                    {/* TODO: Extract feedback / group join component */}
                    {navigation.map(item =>
                      item.name === "Feedback" ? (
                        <button
                          key={item.name}
                          className={classNames(
                            sectionToggled(item)
                              ? "bg-blue-500 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          onClick={evt => handleSectionChange(evt, item, button)}
                          disabled={button.disabled || status === "error"}
                        >
                          {status === "error" ? "Errored" : "Feedback"}
                        </button>
                      ) : (
                        <NavLink
                          to={item.href}
                          key={item.name}
                          className={classNames(
                            sectionToggled(item)
                              ? "bg-blue-500 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={sectionToggled(item) ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      )
                    )}
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
              {/* TODO: Extract feedback / group join component */}
              {navigation.map(item =>
                item.name === "Feedback" ? (
                  <div className="w-full flex flex-row justify-end">
                    <button
                      key={item.name}
                      className={classNames(
                        sectionToggled(item)
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      onClick={evt => handleSectionChange(evt, item, button)}
                      disabled={button.disabled || status === "error"}
                    >
                      {status === "error" ? "Errored" : "Feedback"}
                    </button>
                  </div>
                ) : (
                  <NavLink
                    // onClick={evt => handleSectionChange(evt, item)}
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      sectionToggled(item)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={sectionToggled(item) ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
