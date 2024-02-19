import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavbarSimple } from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative  ">
      <ScrollRestoration />
      <div className="sticky top-0 z-40 overflow-x-hidden w-full">
        <NavbarSimple></NavbarSimple>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
