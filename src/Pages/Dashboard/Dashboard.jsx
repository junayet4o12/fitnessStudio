import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet-async";
const Dashboard = () => {
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
