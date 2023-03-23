import React, { Fragment, useEffect } from "react";
import ResponsiveAppBar from "./AppBar";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const atRoot = useMatch("/");
  useEffect(() => {
    if (atRoot) navigate("/~worpet-bildet");
  }, [atRoot]);

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="px-2 sm:px-5 lg:px-24">
        <div className="flex justify-center max-w-full min-h-screen">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}
