import Rating from "react-rating";
import useAuth from "../../Hooks/useAuth";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const star = useRef();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const rating = star.current.state.value || 1;

    const feedbackInfo = {
      feedbackGiver: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      rating: rating,
      feedback: data?.feedback,
      time: new Date().getTime(),
    };
    axiosPublic.post("/send_feedback", feedbackInfo).then((res) => {
      if (res?.data?.insertedId) {
        reset();
        toast("Thanks for your feedback!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    });

  };

  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-black hover:text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  return (
    <div className=" h-screen px-5 md:px-10 lg:px-20 flex items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold mb-10 md:mb-10">
          Share Your <span className="text-primary">Opinion</span>
        </h1>
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
          <div className="flex-1">
            <div className="bg-white relative flex w-full px-5 lg:px-10 lg:py-3 flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
              <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                <img
                  src={user?.photoURL}
                  alt="Tania Andrew"
                  className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {user?.displayName}
                    </h5>
                  </div>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="p-0 mb-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center gap-5 mb-2">
                    <h1 className="font-semibold">Feedback Rating</h1>
                    <Rating
                      emptySymbol={<FaStar className="text-xl"></FaStar>}
                      fullSymbol={
                        <FaStar className="text-xl text-[#FFB400] hover:scale-110 duration-300"></FaStar>
                      }
                      ref={star}
                    />
                  </div>
                  <h1 className="font-semibold mb-2">
                    Give me your valuable feedback
                  </h1>
                  <textarea
                    placeholder="Write your feedback"
                    {...register("feedback", { required: true })}
                    className="textarea textarea-bordered textarea-lg w-full"></textarea>
                  {errors.feedback?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                      This field is required
                    </span>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`${buttonStyle} bg-primary/40 hover:bg-primary  border-primary hover:border-transparent mt-5`}>
                      Feedback
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 hidden lg:block ">
            <img
              className="w-[1200px]"
              src="https://i.ibb.co/BgW2Js0/feedback-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
