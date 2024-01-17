// import React from 'react';

import { Outlet } from "react-router-dom";
import { NavbarSimple } from "../Shared/Navbar/Navbar";
// import Navbar from "../Shared/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <NavbarSimple></NavbarSimple>
           <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;