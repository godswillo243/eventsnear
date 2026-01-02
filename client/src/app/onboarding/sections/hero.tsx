import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="grid grid-cols-[1fr_324px] max-md:grid-cols-1  wrapper gap-6 ">
      <div className="h-full flex justify-center gap-6 flex-col">
        <div className="space-y-2">
          <h1 className=" lg:h1-bold h2-bold max-sm:h3-bold">
            Where Event Lovers and Organizers Connect
          </h1>
          <p className="p-regular-16 max-sm:p-regular-14 text-muted-foreground">
            Effortlessly discover events you love or create and manage your own.
          </p>
        </div>
        <div className="flex items-center justify-start gap-6 max-sm:gap-2 flex-wrap ">
          <Button size="lg" className="px-8 py-4 rounded-full">
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 rounded-full"
          >
            Create an Event
          </Button>
        </div>
      </div>
      <div className="h-96 overflow-auto max-md:h-64 ">
        <img
          src="/images/hero.png"
          alt="hero"
          className="size-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
