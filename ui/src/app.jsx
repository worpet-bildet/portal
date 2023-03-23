import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "font-awesome/css/font-awesome.min.css";
import { MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { usePortalSubscription } from "./state/usePortal";
import { useLandscapeSubscription } from "./state/useLandscape";
import "./index.css";
import Layout from "./components/Layout";
import { User } from "./pages/user/User";
import { UserIndex } from "./pages/user/Index";
import { Add as AddList } from "./pages/List/Add";
import { Edit as EditList } from "./pages/List/Edit";
import { Add as AddItem } from "./pages/Item/Add";
import { Edit as EditItem } from "./pages/Item/Edit";
import ReactGA from "react-ga";
// import { GenericForm as Me } from "./pages/form/GenericForm";

import theme from "./theme/theme";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: ":patp",
          element: <User />,
        },
        {
          path: "index",
          element: <UserIndex />,
        },
        {
          path: "list/add",
          element: <AddList />,
        },
        {
          path: "list/:listkey/edit",
          element: <EditList />,
        },
        {
          path: "item/:listkey/add",
          element: <AddItem />,
        },
        {
          path: "item/:listkey/:itemkey/edit",
          element: <EditItem />,
        },
      ],
    },
  ],
  { basename: "/apps/portal" }
);

export function App() {
  usePortalSubscription();
  useLandscapeSubscription();
  ReactGA.initialize("G-HC9S8FMZ6C");

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className="page-container text-offwhite">
          <MotionConfig transition={{ duration: 1, reducedMotion: "user" }}>
            <ToastContainer theme="dark" />
            <RouterProvider router={router} icon={false} />
          </MotionConfig>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
