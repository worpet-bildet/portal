import Urbit from "@urbit/http-api";
import { ThemeProvider } from "@mui/material/styles";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePortalSubscription } from "./state/usePortal";
import "./index.css";
import { Curator } from "./pages/curator/Curator";
import { CuratorMe } from "./pages/curator/CuratorMe";
import { DeveloperApplications } from "./pages/curator/DeveloperApplications";
import { DevApplicationPage } from "./pages/developer/DevApplicationPage";
import { Developer } from "./pages/developer/Developer";
import { UploadApplication } from "./pages/developer/UploadApp";
import { ApplicationPage } from "./pages/user/ApplicationPage";
import { CuratorPage } from "./pages/user/CuratorPage";
import { User } from "./pages/user/User";
import { UserCurators } from "./pages/user/UserCurators";

import theme from "./theme/theme";

const api = new Urbit("", "", window.desk);
api.ship = window.ship;

/*
  We'll have to create 3 main routes for each page
  and child routes for each page as many sidebar buttons they have
*/
const router = createBrowserRouter([
  {
    path: "/apps/portal/",
    element: <Navigate replace to="/apps/portal/usr" />,
  },
  {
    path: "/apps/portal/usr",
    element: <User />,
  },
  {
    path: "/apps/portal/usr/curs",
    element: <UserCurators />,
  },
  {
    path: "/apps/portal/usr/curs/:curator",
    element: <CuratorPage />,
  },
  {
    path: "/apps/portal/cur",
    element: <Curator />,
  },
  {
    path: "/apps/portal/cur/me",
    element: <CuratorMe />,
  },
  {
    path: "/apps/portal/usr/apps/:application",
    element: <ApplicationPage />,
  },
  {
    path: "/apps/portal/cur/devs/:developer",
    element: <DeveloperApplications />,
  },
  {
    path: "/apps/portal/dev",
    element: <Developer />,
  },
  {
    path: "/apps/portal/dev/upload-app",
    element: <UploadApplication />,
  },
  {
    path: "/apps/portal/dev/edit-app/:application",
    element: <UploadApplication />,
  },
  {
    path: "/apps/portal/dev/apps/:application",
    element: <DevApplicationPage />,
  },
]);

export function App() {
  usePortalSubscription();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        {/* <GlobalStyle blur={true} realmTheme={defaultTheme.themes.default} /> */}
        {/* <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
        /> */}
      </ThemeProvider>
    </React.Fragment>
  );
}
