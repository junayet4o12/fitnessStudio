import Container from "../../Components/Container/Container";
import Title from "../../Components/Title/Title";
import EventCard from "./EventCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllEvents = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allEvents, refetch } = useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all_event");
      return res?.data;
    },
  });
  console.log(allEvents)

  return (
    <div className="min-h-screen">
      <Container>
        <Title title="All Events"></Title>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-10 px-2">
          {allEvents?.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              allEvents={allEvents}
              refetch={refetch}></EventCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllEvents;
