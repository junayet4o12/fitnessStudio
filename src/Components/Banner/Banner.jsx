// import React from 'react';
import { useNavigate } from "react-router";
import banner from "../../assets/images/dumbbells-floor-gym-ai-generative.jpg";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
const Banner = () => {
  const { user } = useAuth();
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="w-full min-h-[300px] max-h-screen overflow-hidden  relative">
        <img className="w-full  h-full min-h-[300px]" src={banner} alt="" />
        <div className="absolute bg-[#00000064]  w-full h-full  top-0"></div>
        <div className="absolute top-[100px] xs:top-[25%] sm:top-[20%] md:top-[28%] w-full">
          <div className=" bg-primary/60 w-full sm:min-h-[150px] p-3 xs:p-5 xs:py-7  sm:py-10 ">
            <h1 className=" text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white text-center">
              welcome to the futuristic <br /> fitness tracking platform
            </h1>
          </div>
          <div className="flex justify-center items-center gap-5 sm:gap-10 py-3 sm:py-7">
            <Link to={"/contact_us"}>
              <button
                className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary `}>
                Contact us
              </button>
            </Link>
            {user ? (
              ""
            ) : (
              <button
                onClick={handleLogin}
                className={`${buttonStyle} bg-primary/40 hover:bg-primary  border-primary hover:border-transparent`}>
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
