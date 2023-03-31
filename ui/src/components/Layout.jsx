import React, { Fragment, useEffect } from "react";
import ReactGA4 from "react-ga4";
import ResponsiveAppBar from "./AppBar";
import { Outlet, useMatch, useNavigate, useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const atRoot = useMatch("/");
  useEffect(() => {
    if (atRoot) navigate("/~worpet-bildet");
  }, [atRoot]);

  const location = useLocation();
  useEffect(() => {
    ReactGA4.send({
      hitType: "pageview",
      page: location.pathname,
      title: location.pathname,
    });
  }, [location]);

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
