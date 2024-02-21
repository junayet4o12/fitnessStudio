import React, { createElement, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const NavProfile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: <CgProfile />,
    },
    {
      label: "Dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      label:'Connected With',
      icon: <MdOutlineConnectWithoutContact/>
    },
    {
      label: "Sign Out",
      icon: <LiaSignOutAltSolid />,
    },
    
  ];
  const handleAction = (input) => {
    if (input === "My Profile") {
      navigate("/dashboard/profile");
    } else if (input === "Dashboard") {
      navigate("/dashboard/profile");
    } else if(input ==='Connected With'){
      navigate("/dashboard/connected_with")
    }else if (input === "Sign Out") {
      const toastId = toast.loading("Logged Outing...");
      logOut()
        .then(() => {
          toast.success("Logged Out Successfully!", { id: toastId });
        })
        .catch((error) => {
          toast.error(error.code, { id: toastId });
        });
    }
    closeMenu();
  };
  return (
    <div>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full overflow-hidden  py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className={`border ${
                isMenuOpen && "border-primary"
              } w-9 h-9 xs:w-12 xs:h-12 p-0.5 rounded-full`}
              src={user?.photoURL}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1 px-3 z-20">
          <div className="border-2 border-primary w-max rounded-full p-[2px] mx-auto mt-1">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-center">
              {user?.displayName}
            </p>
          </div>
          <hr className="border-primary my-1 border-[1.3px]" />
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => handleAction(label)}
                className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 }`}>
                <p className="w-8 h-8 flex justify-center items-center text-xl text-primary">
                  {icon}
                </p>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "green" : "inherit"}>
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavProfile;
