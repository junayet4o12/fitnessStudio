import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Title from "../../Components/Title/Title";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddEvent = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // const image = { image: data?.image[0] };
    // const res = await axios.post(imgHostingApi, image, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // const eventImageURL = res?.data?.data?.display_url;
    Swal.fire({
      title: "Are you sure?",
      text: "Do you add event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Event Adding...");
        const image = { image: data?.image[0] };
        axios
          .post(imgHostingApi, image, {
            headers: { "content-type": "multipart/form-data" },
          })
          .then((res) => {
            const eventImageURL = res?.data?.data?.display_url;
            const eventInfo = {
              event_provider_name: user?.displayName,
              event_provider_email: user?.email,
              event_provider_image: user?.photoURL,
              event_name: data?.event_name,
              event_description: data?.description,
              event_image: eventImageURL,
              event_price: data?.event_price,
              event_tickets: data?.tickets,
              event_start_date: startDate,
              event_start_end: endDate,
            };
            axiosSecure.post("/all_event", eventInfo).then((res) => {
              if (res?.data?.insertedId) {
                reset();
                toast.success("Event Added Successfully!", { id: toastId });
              }
            });
          });
      }
    });
  };

  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-full font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full px-20">
          <Helmet>
            <title>Add-Event - FitnessStudio</title>
          </Helmet>
          <Title title="Add Event"></Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 ">
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="w-full">
                <label className="text-xl font-[600]" htmlFor="name">
                  Event Name <span className="text-red-600 text-xl">*</span>{" "}
                </label>
                <input
                  {...register("event_name", { required: true })}
                  className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                  type="text"
                  placeholder="Event name"
                />
                {errors.event_name?.type === "required" && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="text-xl font-[600]" htmlFor="price">
                  Price <span className="text-red-600 text-xl">*</span>
                </label>
                <input
                  {...register("event_price", { required: true })}
                  className="text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber bg-transparent  my-2"
                  type="number"
                  placeholder="৳ 00"
                />
                {errors.event_price?.type === "required" && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="text-xl font-[600]" htmlFor="Tickets">
                  Tickets <span className="text-red-600 text-xl">*</span>
                </label>
                <input
                  {...register("tickets", { required: true })}
                  className="text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber bg-transparent  my-2"
                  type="number"
                  placeholder="Tickets"
                />
                {errors.tickets?.type === "required" && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <label className="text-xl font-[600]" htmlFor="description">
              Description <span className="text-red-600 text-xl">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="text-xl p-[10px] w-full border-2 border-primary rounded-md h-[250px] max-h-[250px] min-h-[250px] text-left bg-transparent  my-2"
              placeholder="Description"
              id="description"
              name="description"
            />
            {errors.description?.type === "required" && (
              <span className="text-red-600 text-xs">
                This field is required
              </span>
            )}
            <div className="flex flex-col md:flex-row justify-between gap-2 w-full mt-2">
              <div className="flex-1">
                <label className="text-xl font-[600]" htmlFor="image">
                  Select Event Photo{" "}
                  <span className="text-red-600 text-xl">*</span>
                </label>
                <div className="relative group border-2 border-dashed border-primary rounded-lg py-2 my-2">
                  <div className="flex items-center justify-center gap-5 absolute left-[162px]  group-hover:cursor-pointer">
                    <FaCloudUploadAlt className="text-2xl"></FaCloudUploadAlt>
                    <h1 className="text-lg font-medium">Upload Photo</h1>
                  </div>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    className="w-full opacity-0  group-hover:cursor-pointer"
                  />
                </div>
                {errors.image?.type === "required" && (
                  <span className="text-red-600 text-xs ">Select an image</span>
                )}
              </div>
              <div className=" flex-1">
                <div>
                  <label className="text-xl font-[600]" htmlFor="event_start">
                    Event Start <span className="text-red-600 text-xl">*</span>{" "}
                  </label>
                </div>
                <DatePicker
                  required
                  selected={startDate}
                  onChange={(date) => setStartDate(date.getTime())}
                  endDate={endDate}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  placeholderText="Select Date"
                  className="text-black hover:cursor-pointer pl-[198px] py-[13px] rounded-md my-2 bg-gray-100 w-[485px]"
                />
              </div>
              <div className="flex-1">
                <div>
                  <label className="text-xl font-[600]" htmlFor="event_end">
                    Event End <span className="text-red-600 text-xl">*</span>
                  </label>
                </div>
                <DatePicker
                  required
                  selected={endDate}
                  onChange={(date) => setEndDate(date.getTime())}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date(startDate)}
                  placeholderText="Select Date"
                  className="text-black hover:cursor-pointer pl-[198px] py-[13px] rounded-md my-2 bg-gray-100 w-[485px]"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`${buttonStyle} bg-primary/40 hover:bg-primary  border-primary hover:border-transparent mt-5`}>
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
