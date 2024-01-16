// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";

const MyRouts = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
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