import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { NavbarSimple } from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { useEffect, useState } from "react";
import GlobalMessageBox from "../Components/GlobalMessageBox/GlobalMessageBox";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MainLayout = () => {
  const [navbar, setNavbar] = useState(false)
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: userDetails, isLoading: userDetailsIsLoading, refetch: userDetailsRefetch } = useQuery({
    queryKey: ['singleUserData'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`users/${user?.email}`)
      return res?.data
    }
  })
  console.log(userDetails?._id);
  const changeBackground = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })
  console.log(navbar);
  return (
    <div className="relative ">
      <ScrollRestoration />
      <div onClick={()=> (navigate('/dashboard/connected_with'))} className={`fixed bottom-10 right-10 z-50 ${user?.email ? 'block' : 'hidden'}`}>

        <GlobalMessageBox  userId={userDetails?._id} />
      </div>
      <div className="sticky top-0 z-40 overflow-x-hidden w-full shadow-2xl shadow-white/20">
        <NavbarSimple navbarColor={navbar}></NavbarSimple>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
