import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { FaHome, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { FaBookAtlas, FaCalculator } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // logOut function
    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate("/");
                toast.success("Logged out successfully");
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="w-60 max-h-[800px] bg-gradient-to-r from-secondary to-primary hidden md:block sticky top-0">
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
                <div className="divider"></div>

                {/* main layout navlink */}
                <li>
                    <NavLink to="/">
                        <FaHome /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about_us">
                        <FaBookAtlas /> About Us
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact_us">
                        <FaPhoneAlt /> Contact Us
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
    );
};

export default Sidebar;