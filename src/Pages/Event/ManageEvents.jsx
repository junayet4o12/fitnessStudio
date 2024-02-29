import toast from "react-hot-toast";
import Title from "../../Components/Title/Title";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import EventUpdateModal from "./EventUpdateModal";

const ManageEvents = () => {
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [update, SetUpdate] = useState("");
  const { data: allEvent, refetch } = useQuery({
    queryKey: ["allEvent"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all_event");
      return res?.data;
    },
  });

  const handleEdit = (id) => {
    SetUpdate(id);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        axiosPublic.delete(`/all_event/${id}`).then((res) => {
          if (res?.data?.deletedCount > 0) {
            refetch();
            toast.success("This event has been deleted.", { id: toastId });
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
        {allEvent?.length > 0 ? (
          <div className=" py-10 px-10">
            <Title title="Manage Event"></Title>
            <div className="bg-[#F6F6F6] py-8 md:py-10  rounded-xl px-8">
              <div>
                <div className="flex justify-between">
                  <h1 className="text-4xl font-bold underline underline-offset-8 text-black">
                    Total Events:{" "}
                    <span className="font-sans">{allEvent?.length}</span>
                  </h1>
                </div>
                {/*  */}
                <div>
                  <div className="overflow-x-auto">
                    <table className="table max-w-full my-10">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="text-lg text-black text-center">
                            Event Image
                          </th>
                          <th className="text-lg text-black text-center">
                            Name
                          </th>
                          <th className="text-lg text-black text-center">
                            Provider
                          </th>
                          <th className="text-lg text-black text-center">
                            Email
                          </th>
                          <th className="text-lg text-black text-center">
                            Duration
                          </th>
                          <th className="text-lg text-black text-center">
                            Tickets Avl
                          </th>
                          <th className="text-lg text-black text-center">
                            Price
                          </th>
                          <th className="text-lg text-black pl-10">Action</th>
                          <th className="text-lg text-black pl-10">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allEvent?.map((event) => (
                          <tr key={event?._id}>
                            <th>
                              <div className="avatar flex justify-center">
                                <div className="w-24 h-16 object-cover rounded-lg">
                                  <img src={event?.event_image} />
                                </div>
                              </div>
                            </th>
                            <td className="text-gray-700 text-center">
                              <div
                                className="tooltip"
                                data-tip={event?.event_name}>
                                {event?.event_name?.slice(0, 30)} ...
                              </div>
                            </td>
                            <td className="text-gray-700 text-center">
                              {event?.event_provider_name}
                            </td>
                            <td className="text-gray-700 text-center">
                              {event?.event_provider_email}
                            </td>
                            <td className="text-gray-700 text-center">
                              <span className="font-sans text-gray-700">
                                {formDate(event?.event_start_date).slice(5, 17)}
                              </span>{" "}
                              -{" "}
                              <span className="font-sans text-gray-700">
                                {formDate(event?.event_start_end).slice(5, 17)}
                              </span>
                            </td>
                            <td className="text-gray-700 font-sans text-center">
                              {event?.event_tickets}
                            </td>
                            <td className="text-gray-700 font-sans text-center">
                              {event?.event_price} $
                            </td>
                            <td>
                              <div onClick={() => handleEdit(event?._id)}>
                                <button
                                  onClick={() => setOpenModal(true)}
                                  className={`${buttonStyle} bg-green-500 hover:bg-green-100  border-transparent hover:border-green-500 hover:text-black `}>
                                  Edit
                                </button>
                              </div>
                            </td>
                            <th>
                              <button
                                onClick={() => handleDelete(event?._id)}
                                className={`${buttonStyle} bg-red-500 hover:bg-red-100  border-transparent hover:border-red-500 hover:text-black `}>
                                Delete
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
            <EventUpdateModal
              allEvent={allEvent}
              refetch={refetch}
              update={update}
              openModal={openModal}
              setOpenModal={setOpenModal}></EventUpdateModal>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-500">
              {"Event Not Found"}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageEvents;
