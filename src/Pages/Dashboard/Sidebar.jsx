import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { FaBoxesPacking } from "react-icons/fa6";
import { CiBoxes } from "react-icons/ci";
import { CgGym } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa6";
import { MdOutlineManageHistory } from "react-icons/md";
import {
  FaHome,
  FaPhoneAlt,
  FaUserAlt,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { FaBookAtlas, FaBookMedical, FaCalculator } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { PiSignOutBold } from "react-icons/pi";
import { FaPenNib, FaStrava } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import "./Sidebar.css";
import useAdmin from "../../Hooks/useAdmin";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdFeedback } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const [isAdmin, isAdminPanding] = useAdmin();

  // logOut function
  if (isAdminPanding) {
    return "";
  }
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="scroolBar min-w-56  min-h-screen max-h-screen  hidden md:block sticky top-0 text-white overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
      <div className="scroolBar min-w-56  min-h-screen max-h-screen  
     hidden md:block sticky top-0 overflow-y-auto scroll-smooth bg-primary " style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
        {/* Sidebar logo or Title */}
        <div className="p-4">
          <h1 className="flex text-2xl gap-1 font-bold bg-primary/70 shadow-lg shadow-gray-500 p-1 rounded-md">
            <CgGym className="text-3xl" /> Fitness
            <span className="text-white">Studio</span>
          </h1>
        </div>
        {/* sidebar content here */}
        <ul className="menu p-4 font-semibold text-base">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white "
                  : ""
              }>
              <FaUserAlt /> My Profile
            </NavLink>
          </li>
          {/* admin routs  */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/add_event"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <BiSolidMessageSquareAdd className="text-xl" /> Add Event
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage_users"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <MdOutlineManageAccounts className="text-2xl" /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage_Products"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-primary/80 to-primary/40 text-white"
                      : ""
                  }>
                  <CiBoxes className="text-2xl" /> Manage Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage_blogs"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <SlBookOpen /> Manage Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage_events"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <MdOutlineManageHistory className="text-xl" /> Manage Events
                </NavLink>
              </li>
            </>
          ) : (
            // user Routs
            <>
              <li>
                <NavLink
                  to="/dashboard/connect_people"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <FaUserFriends /> Connect People
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/bmi_calculator"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <FaCalculator /> BMI Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/connect_app"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <BiSolidMessageSquareAdd /> Connected app
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/set_goal"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <AiFillClockCircle /> Set goals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/goal_tracking"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <BiSolidMessageSquareAdd /> Goal Tracking
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/daily_activity"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <GiProgression /> Daily Activities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/strava_activities"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <FaStrava /> Strava Activities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/productForm"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-primary/80 to-primary/40 text-white"
                      : ""
                  }>
                  <FaBoxesPacking /> List a product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/yourProducts"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-primary/80 to-primary/40 text-white"
                      : ""
                  }>
                  <CiBoxes /> Your Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/BlogFrom"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <FaPenNib /> Write a Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my_blogs"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <FaBookMedical /> My Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my_bookings"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <FaBookmark /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/feedback"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-gradient-to-r from-secondary/80 to-secondary/40 text-white"
                      : ""
                  }>
                  <MdFeedback /> Feedback
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>

          {/* main layout navlink */}
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about_us">
              <FaUsers /> About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs">
              <FaBookAtlas /> Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact_us">
              <FaPhoneAlt /> Contact Us
            </NavLink>
          </li>
          <li>
            <button
              title="Click for logging out"
              onClick={handleLogout}
              className="py-2 px-4 text-white bg-black/50 border-b-2 border-l-2 hover:bg-black/70">
              <PiSignOutBold /> Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
