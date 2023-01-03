import Urbit from '@urbit/http-api';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import {
  createBrowserRouter, Navigate, RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Curator } from './pages/curator/Curator';
import { CuratorMe } from './pages/curator/CuratorMe';
import { DeveloperApplications } from './pages/curator/DeveloperApplications';
import { DevApplicationPage } from './pages/developer/DevApplicationPage';
import { Developer } from './pages/developer/Developer';
import { UploadApplication } from './pages/developer/UploadApp';
import { ApplicationPage } from './pages/user/ApplicationPage';
import { CuratorPage } from './pages/user/CuratorPage';
import { User } from './pages/user/User';
import { UserCurators } from './pages/user/UserCurators';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

/*
  We'll have to create 3 main routes for each page
  and child routes for each page as many sidebar buttons they have
*/
const router = createBrowserRouter([
  {
    path: 'apps/app-store/',
    element:<Navigate replace to='/apps/app-store/usr'/>
  },
  {
    path: '/apps/app-store/usr',
    element: <User />
  },
  {
    path: 'apps/app-store/usr/curs',
    element: <UserCurators />
  },
  {
    path: 'apps/app-store/usr/curs/:curator',
    element: <CuratorPage />
  },
  {
    path: '/apps/app-store/cur',
    element: <Curator />
  },
  {
    path: '/apps/app-store/cur/me',
    element: <CuratorMe />
  },
  {
    path: 'apps/app-store/usr/apps/:application',
    element: <ApplicationPage />
  },
  {
    path: '/apps/app-store/cur/devs/:developer',
    element: <DeveloperApplications />
  },
  {
    path: '/apps/app-store/dev',
    element: <Developer />
  },
  {
    path: '/apps/app-store/dev/upload-app',
    element: <UploadApplication />
  },
  {
    path: '/apps/app-store/dev/edit-app/:application',
    element: <UploadApplication />
  },
  {
    path: '/apps/app-store/dev/apps/:application',
    element: <DevApplicationPage />
  }
]);

export function App () {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </React.Fragment>
  );
}
