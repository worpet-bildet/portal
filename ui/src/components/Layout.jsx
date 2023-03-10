import React, { Fragment } from "react";
import ResponsiveAppBar from "./AppBar";
import { AlertModal } from "./AlertModal";

export default function Layout({ children }) {
  return (
    <Fragment>
      <ResponsiveAppBar />
      <AlertModal onRequestClose={() => _setAlertIsOpen(false)} />
      <div className="px-2 sm:px-5 lg:px-24">
        <div className="flex flex-col max-w-full min-h-screen">{children}</div>
      </div>
    </Fragment>
  );
}
