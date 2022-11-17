import Urbit from '@urbit/http-api';
import React from 'react';
import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom';
import './index.css';
import { Developer } from './pages/Developer';
const api = new Urbit('', '', window.desk);
api.ship = window.ship;

/* 
  We'll have to create 3 main routes for each page
  and child routes for each page as many sidebar buttons they have
*/
const router = createBrowserRouter([
  {
    path: '/apps/app-store/dev',
    element: <Developer />
  }
]);

export function App () {
  return (
    <RouterProvider router={router} />
  );
}

// Example function call api
// async function init() {
//   return (await api.scry(scryCharges)).initial;
// }