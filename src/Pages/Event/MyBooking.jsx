import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Title from "../../Components/Title/Title";

const MyBooking = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: myAllBookings, refetch } = useQuery({
    queryKey: ["myAllBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/events_booking/${user?.email}`);
      return res?.data;
    },
  });

  const handleCancel = (id, event_id, event_tickets) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Canceling...");
        axiosPublic.delete(`/cancel_booking/${id}`).then((res) => {
          if (res?.data?.deletedCount > 0) {
            // update tickets count
            const ticketsInt = parseInt(event_tickets);
            const ticketsPlus = ticketsInt + 1;
            const ticketsStg = ticketsPlus.toString();
            const ticketsCountPlus = {
              event_tickets: ticketsStg,
            };
            axiosPublic
              .put(`/event_booking_update/${event_id}`, ticketsCountPlus)
              .then((res) => {
                if (res?.data?.modifiedCount > 0) {
                  refetch();
                  toast.success("This event has been canceled.", {
                    id: toastId,
                  });
                }
              });
          }
        });
      }
    });
  };
  const formDate = (numericDate) => {
    const date = new Date(numericDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[110px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

  return (
    <>
      <div>
        {myAllBookings?.length > 0 ? (
          <div className=" py-10 px-10">
            <Title title="My Bookings"></Title>
            <div className="bg-[#F6F6F6] py-8 md:py-10  rounded-xl px-8">
              <div>
                <div className="flex justify-between">
                  <h1 className="text-4xl font-bold underline underline-offset-8 text-black">
                    Total Booked:{" "}
                    <span className="font-sans">{myAllBookings?.length}</span>
                  </h1>
                </div>
                {/*  */}
                <div>
                  <div className="overflow-x-auto">
                    <table className="table max-w-full my-10">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="text-lg text-black">Event Image</th>
                          <th className="text-lg text-black">Name</th>
                          <th className="text-lg text-black">Provider</th>
                          <th className="text-lg text-black">Email</th>
                          <th className="text-lg text-black">Duration</th>
                          <th className="text-lg text-black">Price</th>
                          <th className="text-lg text-black">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myAllBookings?.map((booking) => (
                          <tr key={booking?._id}>
                            <th>
                              <div className="avatar">
                                <div className="w-24 h-16 object-cover rounded-lg">
                                  <img src={booking?.event_image} />
                                </div>
                              </div>
                            </th>
                            <td className="text-gray-700">
                              <div
                                className="tooltip"
                                data-tip={booking?.event_name}>
                                {booking?.event_name?.slice(0, 30)} ...
                              </div>
                            </td>
                            <td className="text-gray-700">
                              {booking?.event_provider_name}
                            </td>
                            <td className="text-gray-700 ">
                              {booking?.event_provider_email}
                            </td>
                            <td className="text-gray-700 ">
                              <span className="font-sans text-gray-700">
                                {formDate(booking?.event_start_date).slice(
                                  5,
                                  17
                                )}
                              </span>{" "}
                              -{" "}
                              <span className="font-sans text-gray-700">
                                {formDate(booking?.event_start_end).slice(
                                  5,
                                  17
                                )}
                              </span>
                            </td>
                            <td className="text-gray-700 font-sans">
                              {booking?.event_price} $
                            </td>
                            <th>
                              <button
                                onClick={() =>
                                  handleCancel(
                                    booking?._id,
                                    booking?.event_id,
                                    booking?.event_tickets
                                  )
                                }
                                className={`${buttonStyle} bg-red-500 hover:bg-red-100  border-transparent hover:border-red-500 hover:text-black `}>
                                Cancel
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-500">
              {"You don't have a booked event"}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;
