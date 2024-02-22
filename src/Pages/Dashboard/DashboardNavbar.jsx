import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { FaBars, FaStrava, FaTimes, FaUserAlt, FaUserFriends } from "react-icons/fa";
import { FaBookAtlas, FaCalculator } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { FaPenNib } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { CiBoxes } from "react-icons/ci";
import useAuth from "../../Hooks/useAuth";


import { Helmet } from 'react-helmet-async'
import useAdmin from "../../Hooks/useAdmin";
import { MdOutlineConnectWithoutContact, MdOutlineManageAccounts } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";

const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth()
    const [isAdmin, isAdminPanding] = useAdmin();

    if (isAdminPanding) {
        return ''
    }
    // navbar icon toggle
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:hidden p-4 shadow-xl sticky top-0 z-30 rounded-bl-md rounded-br-md bg-white opacity-90">
            <div className="flex items-center justify-between">
                <Helmet>
                    <title>Dashboard - FitnessStudio</title>
                </Helmet>
                <Link to={'/'}>
                    <h1 className="flex text-2xl font-extrabold text-black">
                        <CgGym className="text-3xl text-primary mr-1" /> Fitness
                        <span className="text-primary text-[31px]">Studio</span>
                    </h1>
                </Link>
                <div className="flex gap-2">
                    <div className="avatar online">
                        <div className="w-8 rounded-full">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <button onClick={toggleNavbar} className="text-primary text-xl md:hidden">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            {/* Responsive Navbar for small device */}
            {/* {isOpen && ( */}
            <div
                className={`mt-4 transition-all duration-300 ${isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
                    }`}
            >
                <ul className="menu font-semibold text-sm text-black">
                    <li>
                        <NavLink to="/dashboard/profile"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                            }
                        >
                            <FaUserAlt /> My Profile
                        </NavLink>
                    </li>
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink
                                    to="/dashboard/manage_users"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                    }
                                >
                                    <MdOutlineManageAccounts /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manage_blogs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                    }>
                                    <SlBookOpen /> Manage Blogs
                                </NavLink>
                            </li>
                        </> :
                            <>
                                <li>
                                    <NavLink to="/dashboard/connected_with"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <MdOutlineConnectWithoutContact /> Connected With
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/connect_people"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <FaUserFriends /> Connect People
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/bmi_calculator"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <FaCalculator /> BMI Calculator
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/connect_app"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <BiSolidMessageSquareAdd /> Connected app
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/set_goal"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <AiFillClockCircle /> Set goals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/goal_tracking"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <AiFillClockCircle /> Goal Tracking
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/daily_activity"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <GiProgression /> Daily Activities
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/strava_activities"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }>
                                        <FaStrava /> Strava Activities
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/productForm"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <FaBoxesPacking /> List a product
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/yourProducts"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <CiBoxes /> Your Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/BlogFrom"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <FaPenNib /> Write a Blog
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my_blogs"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                    >
                                        <FaBookAtlas /> My Blogs
                                    </NavLink>
                                </li>
                            </>
                    }

                </ul>
            </div>
            {/* )} */}
        </div>
    );
};

export default DashboardNavbar;