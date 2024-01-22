// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import LogIn from "../Pages/AuthPages/LogIn/LogIn";
import Register from "../Pages/AuthPages/Register/Register";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Dashboard from "../Pages/Dashboard/Dashboard";

const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about_us",
        element: <AboutUs></AboutUs>
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
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'profile',
            element: <div>this is profile</div>
          },
          {
            path: 'bmi_calculator',
            element: <div>this is bmi calculator</div>
          },
          {
            path: 'set_goal',
            element: <div>goal nai. sob offside</div>
          },
          {
            path: 'tracking_progress',
            element: <div>this is tracking progress</div>
          },
          {
            path: 'connected_app',
            element: <div>this is connected App</div>
          }
        ]
      },
    ],
  },
]);

export default MyRouts;
