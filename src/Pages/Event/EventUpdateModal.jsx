import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Button, Dialog, DialogFooter } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EventUpdateModal = ({
  openModal,
  setOpenModal,
  update,
  allEvent,
  refetch,
}) => {
  const axiosPublic = useAxiosPublic();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
  const { register, handleSubmit, reset } = useForm();

  const { data: singleEventData } = useQuery({
    queryKey: ["singleEventData", update],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all_event/${update}`);
      return res?.data;
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Event Updating...");

    if (data?.event_image?.length > 0) {
      const image = { image: data?.event_image[0] };
      const res = await axios.post(imgHostingApi, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const updateImageURL = await res?.data?.data?.display_url;
      const updateInfo = {
        event_name: data?.event_name || singleEventData?.event_name,
        event_description:
          data?.event_description || singleEventData?.event_description,
        event_image: updateImageURL,
        event_price: data?.event_price || singleEventData?.event_price,
        event_tickets: data?.event_tickets || singleEventData?.event_tickets,
        event_start_date: startDate || singleEventData?.event_start_date,
        event_start_end: endDate || singleEventData?.event_start_end,
      };
      axiosPublic.put(`/update_event/${update}`, updateInfo).then((res) => {
        if (res?.data?.modifiedCount > 0) {
          refetch();
          reset();
          setOpenModal(false);
          toast.success("Event Updated Successfully!", { id: toastId });
        }
      });
    }

    const updateInfo = {
      event_name: data?.event_name || singleEventData?.event_name,
      event_description:
        data?.event_description || singleEventData?.event_description,
      event_image: singleEventData?.event_image,
      event_price: data?.event_price || singleEventData?.event_price,
      event_tickets: data?.event_tickets || singleEventData?.event_tickets,
      event_start_date: startDate || singleEventData?.event_start_date,
      event_start_end: endDate || singleEventData?.event_start_end,
    };
    axiosPublic.put(`/update_event/${update}`, updateInfo).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        console.log(res?.data)
        refetch();
        reset();
        setOpenModal(false);
        toast.success("Event Updated Successfully!", { id: toastId });
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
                  {/* Event Image */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="image">
                      Photo{" "}
                    </label>
                    <div className="relative group border-2 border-dashed border-primary rounded-lg py-2 my-2">
                      <div className="flex items-center justify-center gap-5 absolute left-[172px]  group-hover:cursor-pointer">
                        <FaCloudUploadAlt className="text-2xl"></FaCloudUploadAlt>
                        <h1 className="text-lg font-medium">Upload Photo</h1>
                      </div>
                      <input
                        type="file"
                        {...register("event_image")}
                        className="w-full opacity-0  group-hover:cursor-pointer"
                      />
                    </div>
                  </div>
                  {/* Event Name */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="name">
                      Name
                    </label>
                    <input
                      {...register("event_name")}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="text"
                      defaultValue={singleEventData?.event_name}
                    />
                  </div>
                  {/* Event Description */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="email">
                      Description{" "}
                    </label>
                    <input
                      {...register("event_description")}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="text"
                      defaultValue={singleEventData?.event_description}
                    />
                  </div>
                  {/* Event Price */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="number">
                      Price
                    </label>
                    <input
                      {...register("event_price")}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="number"
                      defaultValue={singleEventData?.event_price}
                    />
                  </div>
                  {/* Event Tickets */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="number">
                      Tickets
                    </label>
                    <input
                      {...register("event_tickets")}
                      className="text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent my-2"
                      type="number"
                      defaultValue={singleEventData?.event_tickets}
                    />
                  </div>
                  {/* Event Start Date */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="number">
                      Start Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date.getTime())}
                      endDate={endDate}
                      minDate={new Date()}
                      showDisabledMonthNavigation
                      placeholderText="Select Date"
                      className="text-black hover:cursor-pointer pl-[198px] py-[13px] rounded-md my-2 bg-gray-100 w-[485px]"
                    />
                  </div>
                  {/* Event End Date */}
                  <div className="w-full">
                    <label className="text-xl font-[600]" htmlFor="number">
                      Start End
                    </label>
                    <DatePicker
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
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="text"
                      color="red"
                      className={`${buttonStyle} bg-primary/40 hover:bg-primary  border-primary hover:border-transparent mb-2 -mr-4`}>
                      <span>Update</span>
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
EventUpdateModal.propTypes = {
  update: PropTypes.object.isRequired,
};
export default EventUpdateModal;
