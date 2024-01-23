import { FaCalculator, FaHome, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { GiProgression } from "react-icons/gi";
import { PiSignOutBold } from "react-icons/pi";

const Dashboard = () => {

    const navigate = useNavigate();
    const { logOut } = useAuth();
    const handleLogout = () => {
        logOut()
          .then(() => {
            navigate("/");
            toast.success("Logged out successfully");
          })
          .catch((err) => toast.error(err));
      };

    return (
        <div className="flex">
            {/* dashboard side content */}
            <div className="w-60 min-h-screen bg-primary">
                <ul className="menu p-4">

                    <li><NavLink to='/dashboard/profile'><FaUserAlt></FaUserAlt> My Profile</NavLink></li>
                    <li><NavLink to='/dashboard/addProducts'><FaCalculator /> BMI Calculator</NavLink></li>
                    <li><NavLink to='/dashboard/myProducts'><AiFillClockCircle /> Set goals</NavLink></li>
                    <li><NavLink to='/dashboard/myProducts'><GiProgression /> Tracking Progress</NavLink></li>
                    <li><NavLink to='/dashboard/connect_app'><BiSolidMessageSquareAdd /> Connected app</NavLink></li>

                    <div className="divider"></div>
                    {/* main layout navlink */}
                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/about_us'><FaPhoneAlt /> Contact Us</NavLink></li>
                    <li><NavLink to='/contact_us'><FaBookAtlas /> Aboute Us</NavLink></li>
                    <li><button onClick={handleLogout} className="py-2 px-4 text-white bg-orange-600"><PiSignOutBold />Log Out</button></li>
                </ul>
            </div>
            {/* dashboard contant */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;