import { Button, Dialog, DialogFooter } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const EventBookingModal = ({ openModal, setOpenModal, booked }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Event Booking...");
    const bookingInfo = {
      event_image: booked?.event_image,
      event_name: booked?.event_name,
      event_price: booked?.event_price,
      event_start_date: booked?.event_start_date,
      event_start_end: booked?.event_start_end,
      event_provider_name: booked?.event_provider_name,
      event_provider_email: booked?.event_provider_email,
      user_name: data?.user_name,
      user_email: data?.user_email,
      user_number: data?.user_number,
    };

    axiosPublic.post("/events_booking", bookingInfo).then((res) => {
      if (res?.data?.insertedId) {
        reset();
        toast.success("Event Booking Successfully !", { id: toastId });
        setOpenModal(false);
      }
    });
  };

  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  return (
    <div>
      <div>
        <Dialog
          color="white"
          open={openModal}
          size={"xxl"}
          className=" bg-[#00000062]  flex justify-center items-center p-5 text-white">
          <div className="w-full rounded max-w-[600px] overflow-y-scroll max-h-[90%] relative  bg-no-repeat bg-cover  bg-center border-2 border-white">
            <div className="w-full max-w-[600px] bg-[#000000c0] text-white rounded shadow-xl  relative">
              <div className="text-end px-6 pt-3 sticky top-0 ">
                <button
                  onClick={() => setOpenModal(false)}
                  className="transition-all  px-2 duration-100 text-xl font-bold text-white sticky hover:text-red-500  active:scale-90 active:text-gray-300">
                  X
                </button>
              </div>
              <div className="px-10 text-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="name">
                      Name <span className="text-red-600 text-xl">*</span>{" "}
                    </label>
                    <input
                      {...register("user_name")}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="text"
                      defaultValue={user?.displayName}
                      placeholder="Event your name"
                    />
                  </div>
                  {/* Email */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="email">
                      Email <span className="text-red-600 text-xl">*</span>{" "}
                    </label>
                    <input
                      {...register("user_email")}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="text"
                      defaultValue={user?.email}
                      placeholder="Event your email"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="number">
                      Phone Number{" "}
                      <span className="text-red-600 text-xl">*</span>{" "}
                    </label>
                    <input
                      {...register("user_number", { required: true })}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="number"
                      placeholder="016******59"
                    />
                    {errors.user_number?.type === "required" && (
                      <span className="text-red-600 text-xs">
                        This field is required
                      </span>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="text"
                      color="red"
                      className={`${buttonStyle} bg-primary/40 hover:bg-primary  border-primary hover:border-transparent mb-2 -mr-4`}>
                      <span>Book Now</span>
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
EventBookingModal.propTypes = {
  booked: PropTypes.object.isRequired,
};

export default EventBookingModal;
