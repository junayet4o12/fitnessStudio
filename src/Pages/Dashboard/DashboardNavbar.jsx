import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";

const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // navbar icon toggle
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:hidden p-4 shadow-xl sticky top-0 z-30 rounded-bl-md rounded-br-md bg-white opacity-90">
            <div className="flex items-center justify-between">
                <h1 className="flex text-2xl font-extrabold">
                    <CgGym className="text-3xl text-primary mr-1" /> Fitness
                    <span className="text-primary text-[31px]">Studio</span>
                </h1>
                <button onClick={toggleNavbar} className="text-primary text-xl md:hidden">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            {/* Responsive Navbar for small device */}
            {/* {isOpen && ( */}
            <div
                className={`mt-4 transition-all duration-300 ${isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
                    }`}
            >
                <ul className="menu p-4 font-semibold text-base">
                    <li>
                        <NavLink to="/dashboard/profile"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                            }
                        >
                            <FaUserAlt /> My Profile
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
                        <NavLink to="/dashboard/set_goal"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                            }
                        >
                            <AiFillClockCircle /> Set goals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/tracking_progress"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                            }
                        >
                            <GiProgression /> Tracking Progress
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
                </ul>
            </div>
            {/* )} */}
        </div>
    );
};

export default DashboardNavbar;