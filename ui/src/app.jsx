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
import { User } from "./pages/user/User";
// import { GenericForm as Me } from "./pages/form/GenericForm";

import theme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/apps/portal/",
    // TODO: Change this to the default Portal curator's ship
    element: <Navigate replace to="/apps/portal/~worpet-bildet" />,
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
            <ToastContainer theme="dark" />
            <RouterProvider router={router} icon={false} />
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
          </MotionConfig>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
