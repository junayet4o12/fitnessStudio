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
      <div className="md:flex">
        <DashboardNavbar />
        <Sidebar />

        {/* Dashboard content */}
        <div className="flex-1">
          <ScrollRestoration />
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
