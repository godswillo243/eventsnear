import Image from "@/components/shared/image";
import { events } from "@/constants/dummy-data";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  return (
    <section className="wrapper">
      <div className="h-full flex justify-center gap-6 flex-col py-12">
        <div className="space-y-2 text-center">
          <h3 className=" h3-bold max-sm:h4-bold">Upcoming Events</h3>
          <p className="p-regular-16 max-sm:p-regular-14 text-muted-foreground">
            Explore a variety of events happening soon. Whether you're into
            music, tech, wellness, or food, there's something for everyone.
          </p>
        </div>
        <div className="flex gap-6 overflow-x-auto flex-wrap">
          {events.map((event, i) => (
            <div
              className="rounded-md hover:shadow-md w-56 flex flex-col"
              key={event.id}
            >
              <Link
                to={"/events/" + event.id}
                className="w-56 h-28 overflow-auto"
              >
                <Image
                  src={event.imageUrl}
                  className=" rounded-t-md size-full object-cover"
                  fallbackSrc="/images/placeholder.png"
                />
              </Link>
              <div className="w-full p-2 py-4 flex flex-col gap-2">
                <h4 className="p-medium-16">{event.title}</h4>
                <p className="p-medium-14 text-muted-foreground">
                  {event.date}
                </p>
                <p className="p-regular-14 text-muted-foreground">
                  {event.location}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="p-medium-16 text-muted-foreground">
                    {event.category}
                  </span>
                  <span className="text-muted-foreground p-medium-12">
                    {event.isFree ? "Free" : event.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
