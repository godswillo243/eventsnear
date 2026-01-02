const HowItWork = () => {
  return (
    <section className="wrapper">
      <div className="h-full flex justify-center gap-6 flex-col py-12">
        <div className="space-y-2 text-center">
          <h3 className=" h3-bold max-sm:h4-bold">How It Works</h3>
          <p className="p-regular-16 max-sm:p-regular-14 text-muted-foreground">
            Whether you’re attending or organizing, our app makes every step
            effortless—discover, book, host, and manage events in one place.
          </p>
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 mt-8 items-center">
          {[
            {
              title: "Discover and Join",
              desc: "Find events that match your interests—from workshops to concerts—and secure your spot in seconds.",
            },
            {
              title: "Create and Manage",
              desc: "Organizers can easily create events, track bookings, and reach the right audience effortlessly.",
            },
          ].map(({ desc, title }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-4 p-6 border rounded-lg"
            >
              <h3 className="h5-bold">{title}</h3>
              <p className="p-regular-16 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
