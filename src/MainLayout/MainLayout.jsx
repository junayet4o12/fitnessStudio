import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavbarSimple } from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })
  console.log(navbar);
  return (
    <div className="relative  ">
      <ScrollRestoration />
      <div className="sticky top-0 z-40 overflow-x-hidden w-full shadow-2xl shadow-white/20">
        <NavbarSimple navbarColor={navbar}></NavbarSimple>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
