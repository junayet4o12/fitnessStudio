import { useState, useRef, useEffect } from "react";
import { FaCalculator, FaHome, FaListAlt, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { GiProgression } from "react-icons/gi";
import { PiSignOutBold } from "react-icons/pi";
import Footer from "../../Shared/Footer/Footer";
import { IoCloseSharp } from "react-icons/io5";
import { CgGym } from "react-icons/cg";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef(null);

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate("/");
                toast.success("Logged out successfully");
            })
            .catch((err) => toast.error(err));
    };

    const handleClickOutsideDrawer = (e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target)) {
            setIsDrawerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDrawer);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDrawer);
        };
    }, []);

    return (
        <>
            <div className="flex">
                {/* Toggle button for small devices */}
                <button
                    onClick={handleToggleDrawer}
                    className="block md:hidden p-4 h-12 w-12 text-2xl transition duration-700 z-50"
                >
                    {isDrawerOpen ? '' : <FaListAlt />}
                </button>

                {/* Drawer for small devices */}
                <div
                    ref={drawerRef}
                    className={`${isDrawerOpen
                        ? "transition-transform transform translate-x-0 duration-500"
                        : "transition-transform transform -translate-x-full duration-500"
                        } sm:hidden fixed top-0 left-0 w-60 h-full bg-gradient-to-r from-secondary to-primary z-30 overflow-y-auto`}
                >
                    {/* Sidebar logo or Title */}
                    <div className="flex justify-between">
                        <h1 className="flex text-xl font-bold p-4">
                            Fitness<span className="text-white">Studio</span>
                        </h1>
                    
                    <button
                        onClick={handleToggleDrawer}
                        className="block md:hidden p-4 h-12 w-12 text-2xl transition duration-700 z-50"
                    >
                        {isDrawerOpen ? <IoCloseSharp /> : ''}
                    </button>
                    </div>
                    <ul className="menu p-4 font-semibold text-base">
                        <li>
                            <NavLink to="/dashboard/profile"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <FaUserAlt /> My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/bmi_calculator"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <FaCalculator /> BMI Calculator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/set_goal"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <AiFillClockCircle /> Set goals
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/tracking_progress"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <GiProgression /> Tracking Progress
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/connect_app"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <BiSolidMessageSquareAdd /> Connected app
                            </NavLink>
                        </li>
                        <div className="divider"></div>

                        {/* main layout navlink */}
                        <li>
                            <NavLink to="/">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about_us">
                                <FaPhoneAlt /> Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact_us">
                                <FaBookAtlas /> About Us
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 text-white border-b"
                            >
                                <PiSignOutBold /> Log Out
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Sidebar for medium and large devices */}
                <div className="w-60 min-h-screen bg-gradient-to-r from-secondary to-primary hidden md:block">
                    {/* Sidebar logo or Title */}
                    <div className="p-4">
                        <h1 className="flex text-2xl gap-1 font-bold bg-primary shadow-lg shadow-gray-500 p-1 rounded-md">
                            <CgGym className="text-3xl" /> Fitness
                            <span className="text-white">Studio</span>
                        </h1>
                    </div>
                    {/* sidebar content here */}
                    <ul className="menu p-4 font-semibold text-base">
                        <li>
                            <NavLink to="/dashboard/profile"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <FaUserAlt /> My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/bmi_calculator"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <FaCalculator /> BMI Calculator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/set_goal"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <AiFillClockCircle /> Set goals
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/tracking_progress"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <GiProgression /> Tracking Progress
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/connect_app"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-orange-600 text-white" : ""
                                }
                            >
                                <BiSolidMessageSquareAdd /> Connected app
                            </NavLink>
                        </li>
                        <div className="divider"></div>

                        {/* main layout navlink */}
                        <li>
                            <NavLink to="/">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about_us">
                                <FaPhoneAlt /> Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact_us">
                                <FaBookAtlas /> About Us
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 text-white border-b"
                            >
                                <PiSignOutBold /> Log Out
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Dashboard content */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
