import React, { createElement, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
const NavProfile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const { user,logOut } = useAuth();
    const profileMenuItems = [
        {
            label: "My Profile",
            icon: <CgProfile></CgProfile>,
        },
        {
            label: "Edit Profile",
            icon: <FaUserEdit></FaUserEdit>,
        },
        {
            label: "Sign Out",
            icon: <LiaSignOutAltSolid></LiaSignOutAltSolid>,
        },
    ];
    const handleAction = (input) => {
           if(input==='My Profile'){
           console.log(input);
           }
           else if(input==='Edit Profile'){
            console.log(input);
           }
           else if(input==='Sign Out'){
            logOut()
           }
        closeMenu()
    }
    return (
        <div>
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full overflow-hidden  py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-gray-900 w-9 h-9 xs:w-12 xs:h-12 p-0.5 rounded-full"
                            src={user?.photoURL}
                        />
                        <span
                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                }`}
                        ><IoIosArrowDown/></span>
                    </Button>
                </MenuHandler>
                <MenuList className="p-1 z-20">
                    {profileMenuItems.map(({ label, icon }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                                key={label}
                                onClick={()=>handleAction(label)}
                                className={`flex items-center gap-2 rounded ${isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                                    }`}
                            >
                               <p className='w-10 h-10 flex justify-center items-center text-xl text-primary'>{icon}</p>
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={isLastItem ? "red" : "inherit"}
                                >
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