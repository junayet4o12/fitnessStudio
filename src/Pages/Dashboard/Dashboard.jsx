import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { socket } from "../../socketIo/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import useAuth from "../../Hooks/useAuth";
const Dashboard = () => {
  const dispatch = useDispatch()
  const {user } = useAuth
  const { user: userDetails } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(fetchSingleUser(user?.email))
  }, [user, dispatch])
  useEffect(() => {
    socket.emit('user_connected', { userId: userDetails?._id })

  }, [userDetails])
  return (
    <>
      <Helmet>
        <title> Dashboard - FitnessStudio</title>
      </Helmet>
      <div className="md:flex  ">
        {/* bg-gradient-to-l from-[#1e5e5e] to-[#022222] */}
        <DashboardNavbar />

        <Sidebar />

        {/* Dashboard content */}
        <div className="flex-1 overflow-x-hidden">
          <ScrollRestoration />
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
