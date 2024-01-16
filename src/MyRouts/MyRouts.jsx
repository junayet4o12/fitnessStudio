// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
<<<<<<< HEAD
import LogIn from "../Pages/AuthPages/LogIn/LogIn";
import Register from "../Pages/AuthPages/Register/Register";

const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <div>This is home</div>,
      },
      {
        path: "/services",
        element: <div>This is Services</div>,
      },
      {
        path: "/contact_us",
        element: <div>This is Contact Us</div>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
    ],
  },
]);
=======
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
>>>>>>> 56ac1d1444767788cde35a50e12af6fab0d72b08

export default MyRouts;
