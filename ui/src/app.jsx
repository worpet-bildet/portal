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
import { Add as AddList } from "./pages/List/Add";
import { Edit as EditList } from "./pages/List/Edit";
import { Add as AddItem } from "./pages/Item/Add";
import { Edit as EditItem } from "./pages/Item/Edit";
// import { GenericForm as Me } from "./pages/form/GenericForm";

import theme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/apps/portal/",
    // TODO: Change this to the default Portal curator's ship
    element: <Navigate replace to="/apps/portal/~worpet-bildet" />,
  },
  {
    path: "/apps/portal/list/add",
    element: <AddList />,
  },
  {
    path: "/apps/portal/list/:listkey/edit",
    element: <EditList />,
  },
  {
    path: "/apps/portal/item/:listkey/add",
    element: <AddItem />,
  },
  {
    path: "/apps/portal/item/:listkey/:itemkey/edit",
    element: <EditItem />,
  },
  {
    path: "/apps/portal/:patp",
    element: <User />,
  },
  // {
  //   path: "/apps/portal/me",
  //   element: <Me />,
  // },
]);

export function App() {
  usePortalSubscription();
  useLandscapeSubscription();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className="page-container text-offwhite">
          <MotionConfig transition={{ duration: 1, reducedMotion: "user" }}>
            <Layout>
              <ToastContainer theme="dark" />
              <RouterProvider router={router} icon={false} />
            </Layout>
          </MotionConfig>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
