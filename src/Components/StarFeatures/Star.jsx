import { FaRegStar } from "react-icons/fa";
const Star = () => {
  return (
    <div>
      <section className="">
        <div className="container px-8 py-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white underline underline-offset-4">
            Features we provided
          </h2>

          <div className="grid gap-8 my-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <div className="-mt-6 ">
              <div className="w-full max-w-xs text-center py-5 bg-secondary flex flex-col justify-center items-center transform transition-transform duration-500 hover:translate-y-4 rounded-xl shadow-xl ">
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

            <div className="w-full max-w-xs text-center bg-secondary flex flex-col justify-center items-center transform transition-transform duration-500 hover:-translate-y-4  py-5 rounded-xl shadow-xl ">
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
              <div className="w-full max-w-xs text-center py-5 bg-secondary flex flex-col justify-center items-center transform transition-transform duration-500 hover:translate-y-4  rounded-xl shadow-xl ">
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

            <div className="w-full max-w-xs text-center bg-secondary flex flex-col justify-center items-center transform transition-transform duration-500 hover:-translate-y-4  py-5 rounded-xl shadow-xl ">
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
