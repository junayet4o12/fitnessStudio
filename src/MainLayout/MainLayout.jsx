
import { Outlet } from "react-router-dom";
import { NavbarSimple } from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <NavbarSimple></NavbarSimple>
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;