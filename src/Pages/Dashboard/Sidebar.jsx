import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { FaBoxesPacking } from "react-icons/fa6";
import { CiBoxes } from "react-icons/ci";
import { CgGym } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa6";
import { MdOutlineConnectWithoutContact, MdOutlineManageHistory } from "react-icons/md";
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
import { FaHandsHelping } from "react-icons/fa";
import "./Sidebar.css";
import useAdmin from "../../Hooks/useAdmin";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import sidebarBG from '../../assets/images/dashboardbg.jpg'
const Sidebar = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();
  const [isAdmin, isAdminPanding] = useAdmin();
  const [sideBarTransition, setSideBarTransition] = useState(false)
  const handleTransition = () => {
    const selectedId = document.getElementById('checkScroll');
    if (selectedId?.scrollTop >= 145) {
      setSideBarTransition(true)
    } else {
      setSideBarTransition(false)
    }
  }
  useEffect(() => {
    handleTransition()
    const selectedId = document.getElementById('checkScroll');
    selectedId?.addEventListener("scroll", handleTransition)
  })
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
  const handleGoToHome = () => {
    navigate('/')
  }

  const sidebarLinkStyle = 'bg-gradient-to-r from-white/90 to-white/60 text-black'
  return (
    <div className="scroolBar min-w-56  min-h-screen max-h-screen  hidden md:block sticky top-0 text-white overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
      <div id="checkScroll" className="scroolBar min-w-56  min-h-screen max-h-screen  
     hidden md:block sticky top-0 overflow-y-auto scroll-smooth  "  style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1', background: `url(${sidebarBG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        {/* Sidebar logo or Title */}

        {/* sidebar content here */}

        <div className={`sticky top-[-154px] z-10 pb-2  rounded bg-primary transition-all duration-500`}>
          <div className="px-4 pt-[18px] bg-primary rounded-md pb-[10px] sticky top-0 z-10">
            <h1 onClick={handleGoToHome} className="flex text-2xl gap-1 font-bold bg-primary  shadow-lg shadow-gray-500 p-1 rounded-md w-full cursor-pointer">
              <CgGym className="text-3xl" /> Fitness
              <span className="text-secondary">Studio</span>
            </h1>
          </div>
          <div className={` ${sideBarTransition ? 'opacity-0 scale-y-0' : 'opacity-100  scale-y-100 '} flex transition-all duration-500 w-[85%] px-3 py-2   mx-auto rounded-md  justify-center items-center gap-1 flex-col shadow-md shadow-white  bg-primary my-2 mt-3`}>
            <img className="rounded-full w-24 h-24 object-cover border-white border-[2px]  p-[2px]" src={user?.photoURL} alt="" />
            <p className="text-base font-bold">
              {user?.displayName.split(' ').slice(0, 2).join(' ')}
            </p>
          </div>
        </div>
        <ul className="menu p-4 font-semibold text-base">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                    ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                  to="/dashboard/connected_with"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? `${sidebarLinkStyle}`
                        : ""
                  }>
                  <MdOutlineConnectWithoutContact /> Connected With
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/connect_people"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
                        : ""
                  }>
                  <FaCalculator /> BMI Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/helpForm"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? `${sidebarLinkStyle}`
                        : ""
                  }>
                  <FaHandsHelping  /> Ask for Help
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/connect_app"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
                        ? `${sidebarLinkStyle}`
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
