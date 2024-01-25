import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {

    return (
        <>
            <div className="md:flex">
                <DashboardNavbar />
                <Sidebar />

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
