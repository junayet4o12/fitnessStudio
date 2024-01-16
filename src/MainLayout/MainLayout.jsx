// import React from 'react';

import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
           This is Main Layout
           <Outlet></Outlet> 
        </div>
    );
};

export default MainLayout;