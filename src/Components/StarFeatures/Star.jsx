import { FaRegStar } from "react-icons/fa";
import Title from "../Title/TItle";
const Star = () => {
  const cardStyle = 'w-[280px] max-w-xs text-center bg-primary flex flex-col justify-center items-center transform transition-transform duration-500 py-5 rounded-xl shadow-xl'
  return (
    <div>
      <section className="">
        <Title title={'Our Features'}></Title>
        <div className="container px-8 py-8 mx-auto">
          

          <div className="flex flex-wrap justify-center items-center gap-8 my-14 ">

            <div className="-mt-6 ">
              <div className={`${cardStyle} hover:translate-y-4 `}>
                <div>
                  <FaRegStar className="text-8xl text-center text-white"></FaRegStar>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-100">
                    Activity Tracking
                  </h3>
                </div>
              </div>
            </div>

            <div className={`${cardStyle} hover:-translate-y-4 `}>
              <div>
                <FaRegStar className="text-8xl text-center text-white"></FaRegStar>
              </div>

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-100">
                  Progress Analytics
                </h3>
              </div>
            </div>

            <div className="-mt-6 ">
              <div className={`${cardStyle} hover:translate-y-4 `}>
                <div>
                  <FaRegStar className="text-8xl text-center text-white"></FaRegStar>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-100">
                    Time Management
                  </h3>
                </div>
              </div>
            </div>

            <div className={`${cardStyle} hover:-translate-y-4 `}>
              <div>
                <FaRegStar className="text-8xl text-center text-white"></FaRegStar>
              </div>

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-100">
                  Workout Progress
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Star;
