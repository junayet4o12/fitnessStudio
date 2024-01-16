// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

const MyRouts = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <div>This is home</div>
        },
        {
            path: '/services',
            element: <div>This is Services</div>
        },
        {
            path: '/contactus',
            element: <div>This is Contact Us</div>
        },
        {
            path: '/register',
            element: <div>This is Register</div>
        },
        {
            path: '/login',
            element: <div>This is Login</div>
        },
      ]
    },
  ]);

export default MyRouts;