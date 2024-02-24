import { BiSolidPurchaseTag } from "react-icons/bi";
import PropTypes from "prop-types";
import { useState } from "react";
import EventBookingModal from "./EventBookingModal";

const EventCard = ({ event }) => {
  const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);
  const {
    event_description,
    event_image,
    event_name,
    event_price,
    event_provider_email,
    event_provider_name,
    event_start_date,
    event_start_end,
    event_tickets,
  } = event || {};
  const [booked, setBooked] = useState("");
  const handleBook = (
    event_image,
    event_name,
    event_price,
    event_provider_name,
    event_provider_email
  ) => {
    const bookingData = {
      event_image: event_image,
      event_name: event_name,
      event_price: event_price,
      event_provider_name: event_provider_name,
      event_provider_email: event_provider_email,
    };
    setBooked(bookingData);
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
  return (
    <div>
      <div className="group relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg ">
        <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <img
            className="h-[300px] w-full object-cover group-hover:scale-110 transition duration-500 group-hover:rotate-2"
            src={event_image}
            alt="ui/ux review check"
          />
          <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <h5 className="block text-2xl mb-3 antialiased font-bold leading-snug tracking-normal text-primary">
              {event_name}
            </h5>
            <button
              onClick={() =>
                handleBook(
                  event_image,
                  event_name,
                  event_price,
                  event_provider_name,
                  event_provider_email
                )
              }>
              <BiSolidPurchaseTag
                onClick={() => setOpenSuggestionsModal(true)}
                className="text-3xl -mt-2 hover:text-black hover:cursor-pointer"
              />
            </button>
          </div>

          <p className=" block font-sans text-base antialiased font-light leading-relaxed text-gray-600 min-h-[160px] ">
            {event_description}....
          </p>
          <div className="mt-2">
            <p className="text-lg font-bold text-black ">
              Duration :{" "}
              <span className="font-sans text-gray-700">
                {formDate(event_start_date).slice(5, 17)}
              </span>{" "}
              -{" "}
              <span className="font-sans text-gray-700">
                {formDate(event_start_end).slice(5, 17)}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-black ">
              Tickets Avl :{" "}
              <span className="font-sans text-gray-700">{event_tickets}</span>
            </p>
            <p className="text-lg font-bold text-black">
              Price :{" "}
              <span className="font-sans text-gray-700">{event_price} $</span>
            </p>
          </div>
        </div>
      </div>
      <EventBookingModal
        booked={booked}
        open={openSuggestionsModal}
        setOpen={setOpenSuggestionsModal}></EventBookingModal>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCard;
