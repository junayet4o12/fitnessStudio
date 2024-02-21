import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { PiListBulletsFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import NavProfile from "./NavProfile";
import useAuth from "../../Hooks/useAuth";
import { CgGym } from "react-icons/cg";
import { NotificationsMenu } from "./Notification";

function NavList() {
  const { user } = useAuth()
  return (
    <ul className="my-2 flex flex-col text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-1">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Home
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary text-sm"></p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            Home
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary"></p>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            Blogs
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary"></p>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            Library
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary"></p>
          <NavLink
            to="/specialRecipe"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            Special Recipes
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          About Us
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary"></p>
          <NavLink
            to="/about_us"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            About Us
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Contact
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary"></p>
          <NavLink
            to="/contact_us"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            Contact Us
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Login
        </a> */}
        {!user && <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-primary"></p>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-base font-bold"
                : "text-base font-bold text-gray-300"
            }>
            Login
          </NavLink>
        </div>}
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useAuth()
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className=" mx-auto min-w-[100vw] rounded-none px-1 xs:px-6 py-3 bg-gradient-to-r from-[#000428] to-[#004e92] sticky top-0 z-20 bg-opacity-80 backdrop-blur-2xl border-none  backdrop-saturate-200 inset-0">

      <div className="lg:container mx-auto flex items-center justify-between text-black">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5">
          <Link to={'/'} className="scroll-smooth">
            <h1 className="flex items-center text-xl xs:text-2xl text-white font-bold md:text-4xl md:font-extrabold">
              <CgGym className="text-primary mr-1 text-3xl md:text-5xl" />Fitness
              <span className="text-primary text-2xl xs:text-3xl md:text-5xl">Studio</span>
            </h1>
          </Link>
        </Typography>
        <div className="flex gap-7 xs:gap-5 items-center">
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white/90"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <IoCloseSharp className="h-6 w-8" strokeWidth={2} />
            ) : (
              <PiListBulletsFill className="h-6 w-8" strokeWidth={2} />
            )}
          </IconButton>

          <span className="flex  items-center gap-3 ">
            {/* <span className="text-lg relative py-4 px-2 cursor-pointer active:scale-90 transition-all dura">
              <FaBell/>
              <span className="absolute top-0 right-0 bg-primary w-[17px] h-[17px] flex justify-center items-center rounded-full text-white text-sm font-medium">1</span>
            </span> */}

          {/* Bell icon with notification button */}
          {user && <NotificationsMenu /> }

          {/* User Profile component */}
          <span className="">
            {user && <NavProfile />}
          </span>
          </span>


        </div>

      </div>

      <Collapse open={openNav} className="w-fit">
        <NavList />
      </Collapse>

    </Navbar>
  );
}

// export default NavList;
