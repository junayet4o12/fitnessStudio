import { FaRunning } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { IoMdTimer } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { GoGoal } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineFoodBank } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";


import Title from "../Title/Title";
import Container from "../Container/Container";
const OurFeatures = () => {
  // const cardStyle = 'w-[280px] max-w-xs text-center bg-primary flex flex-col justify-center items-center transform transition-transform duration-500 py-5 rounded-xl shadow-xl'

  const cardStyle =
    "   mx-auto w-full max-w-[350px]  text-center bg-primary flex flex-col justify-center items-center transform transition-transform duration-500 py-5 rounded-xl shadow-xl cursor-pointer";
  return (
    // <Container>
      <div className="mt-[50px] mb-[120px] p-4">
        <Title title={"Our Features"}></Title>
        {/* <section className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-8 my-[50px]">
              <div className=" ">
                <div className={`${cardStyle} hover:translate-y-4 `}>
                  <div>
                    <FaRunning className="text-8xl text-center text-white"></FaRunning>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-white">
                      Activity Tracking
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className={`${cardStyle} hover:-translate-y-4 lg:mb-[-150px]  `}>
                <div>
                  <GiProgression className="text-8xl text-center text-white"></GiProgression>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-white">
                    Progress Analytics
                  </h3>
                </div>
              </div>

              <div className="">
                <div className={`${cardStyle} hover:translate-y-4 `}>
                  <div>
                    <IoMdTimer className="text-8xl text-center text-white"></IoMdTimer>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-white">
                      Time Management
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className={`${cardStyle} hover:-translate-y-4 lg:mb-[-150px]`}>
                <div>
                  <CgGym className="text-8xl text-center text-white"></CgGym>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-white">
                    Workout Progress
                  </h3>
                </div>
              </div>
            </div>
        </section> */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div
          className="p-[20px] flex flex-col items-center justify-center gap-3 text-center"
          >
            <GoGoal className="text-8xl text-center"/>
            <h1 className="font-bold text-2xl">Goal Tracking</h1>
            <p className="font-[500]">Setting and monitoring measurable goals is key to personal growth and productivity. Tracking progress helps celebrate achievements and identify areas for improvement.</p>
          </div>
          <div
          className="p-[20px] flex flex-col items-center justify-center gap-3 bg-secondary text-white text-center"
          >
            <HiOutlineLightBulb className="text-8xl text-center"/>
            <h1 className="font-bold text-2xl">Personalized Suggestions</h1>
            <p className="font-[500]">Tailored recommendations based on user data enhance engagement across platforms like e-commerce and streaming services. These suggestions offer a more personalized user experience.</p>
          </div>
          <div
          className="p-[20px] flex flex-col items-center justify-center gap-3 text-center"
          >
            <MdOutlineFoodBank className="text-8xl text-center"/>
            <h1 className="font-bold text-2xl">Food Tips</h1>
            <p className="font-[500]">Offering practical advice on nutrition and healthy eating habits, food tips empower individuals to make informed dietary choices for a healthier lifestyle.</p>
          </div>
          <div
          className="p-[20px] flex flex-col items-center justify-center gap-3 bg-secondary text-white text-center"
          >
            <FaUserFriends className="text-8xl text-center"/>
            <h1 className="font-bold text-2xl">Community</h1>
            <p className="font-[500]">Communities provide support, knowledge sharing, and a sense of belonging to individuals with shared interests or identities, fostering collaboration and driving positive change.</p>
          </div>
          <div
          className="p-[20px] flex flex-col items-center justify-center gap-3 text-center"
          >
            <FaRunning className="text-8xl text-center"></FaRunning>
            <h1 className="font-bold text-2xl">Daily Activity Tracking</h1>
            <p className="font-[500]">Monitoring daily activities helps individuals understand their habits and productivity levels, enabling them to set goals and optimize their routines for better efficiency.</p>
          </div>
          <div
          className="p-[20px] flex flex-col items-center justify-center gap-3 bg-secondary text-white text-center"
          >
            <BsBoxSeamFill className="text-8xl text-center"/>
            <h1 className="font-bold text-2xl">Product Selling</h1>
            <p className="font-[500]">Marketing and selling goods or services involve understanding consumer needs, effective positioning, and delivering value through quality products and exceptional customer service.</p>
          </div>
        </div>
      </div>
    // </Container>
  );
};

export default OurFeatures;
