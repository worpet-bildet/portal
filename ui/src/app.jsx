import { ThemeProvider } from "@mui/material/styles";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { usePortalSubscription } from "./state/usePortal";
import "./index.css";
import { User } from "./pages/user/User";

import theme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/apps/portal/",
    element: <Navigate replace to="/apps/portal/usr" />,
  },
  {
    path: "/apps/portal/:patp",
    element: <User />,
  },
]);

export function App() {
  usePortalSubscription();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className="page-container text-offwhite">
          <RouterProvider router={router} />
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
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
