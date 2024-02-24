import { Button, Dialog, DialogFooter } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const EventBookingModal = ({ open, setOpen, booked }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(false);
    console.log(data);
  };

  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  return (
    <div>
      <div>
        <Dialog
          color="white"
          open={open}
          size={"xxl"}
          className=" bg-[#00000062]  flex justify-center items-center p-5 text-white">
          <div className="w-full rounded max-w-[600px] overflow-y-scroll max-h-[90%] relative  bg-no-repeat bg-cover  bg-center border-2 border-white">
            <div className="w-full max-w-[600px] bg-[#000000c0] text-white rounded shadow-xl  relative">
              <div className="text-end px-6 pt-3 sticky top-0 ">
                <button
                  onClick={() => setOpen(false)}
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

export default EventBookingModal;
