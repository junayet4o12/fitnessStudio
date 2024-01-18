import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { PiListBulletsFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Home
        </a> */}
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-primary flex items-center md:text-lg hover:underline transition-colors underline" : "flex items-center md:text-lg hover:underline transition-colors"
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          About Us
        </a> */}
        <NavLink
          to="/aboutUs"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-primary flex items-center md:text-lg hover:underline transition-colors  underline" : "flex items-center md:text-lg hover:underline transition-colors"
          }
        >
          About Us
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Contact
        </a> */}
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-primary flex items-center md:text-lg hover:underline transition-colors  underline" : "flex items-center md:text-lg hover:underline transition-colors"
          }
        >
          Contact
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Login
        </a> */}
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-primary flex items-center md:text-lg hover:underline transition-colors  underline" : "flex items-center md:text-lg hover:underline transition-colors"
          }
        >
          Login
        </NavLink>
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto  max-w-screen-xl px-6 py-3 bg-white sticky top-0 z-20 ">
      <div className="flex lg:items-center justify-between text-blue-gray-900 text-black">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          <h1 className="text-2xl font-bold md:text-4xl md:font-extrabold">Fitness<span className="text-primary text-3xl md:text-5xl">Studio</span></h1>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <IoCloseSharp className="h-6 w-8" strokeWidth={2} />
          ) : (
            <PiListBulletsFill className="h-6 w-8" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

// export default NavList;