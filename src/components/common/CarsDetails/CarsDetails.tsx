import WhatsAppIcon from "public/assets/icons/Socials/wattsapp.svg";
import Image from "next/image";
import SwiperGalery from "../Swiper/SwiperGalary";
import { Typography } from "../../elements/Typography";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { SectionContainer } from "../../elements/SectionContainer";

export const CarsDetails = () => {
  const Specs = [
    {
      id: 1,
      image: "/assets/icons/parts/brand.png",
      title: "Make",
      name: "Nissan",
    },
    {
      id: 2,
      image: "/assets/icons/parts/specs.png",
      title: "Specs",
      name: "nissan",
    },
    {
      id: 3,
      image: "/assets/icons/parts/model.png",
      title: "Model",
      name: "Patrol LE PLATINUM",
    },
    {
      id: 4,
      image: "/assets/icons/parts/gearbox.png",
      title: "Gearbox",
      name: "Automatic",
    },
    {
      id: 5,
      image: "/assets/icons/parts/calendar-date.png",
      title: "Year",
      name: "2016",
    },
    {
      id: 6,
      image: "/assets/icons/parts/fuel-station.png",
      title: "Fuel",
      name: "Gasoline",
    },
    {
      id: 7,
      image: "/assets/icons/parts/wheel.png",
      title: "Wheels",
      name: "21'",
    },
    {
      id: 8,
      image: "",
      title: "Seat",
      name: "8",
    },
    {
      id: 9,
      image: "/assets/icons/parts/filter.png",
      title: "Color",
      name: "White",
    },
    {
      id: 7,
      image: "",
      title: "Cylinders",
      name: "8",
    },
    {
      id: 10,
      image: "/assets/icons/parts/car.png",
      title: "Vehicle Type",
      name: "SUV/Crossover",
    },
    {
      id: 11,
      image: "",
      title: "Interior",
      name: "Brown",
    },
    {
      id: 12,
      image: "/assets/icons/parts/speed.png",
      title: "Kilometers",
      name: "86,000",
    },
    {
      id: 13,
      image: "",
      title: "Price",
      name: "AED 159,950",
    },
    {
      id: 14,
      image: "",
      title: "Export Status",
      name: "Can be exported",
    },
  ];

  const Others = {
    interiorDessign: [
      "Power windows",
      "Sunroof",
      "Navigation system",
      "Tuner/radio",
      "Front camera",
    ],
    exteriorFeatures: [
      "Power windows",
      "Sunroof",
      "Navigation system",
      "Tuner/radio",
      "Front camera",
    ],
    securityEnvironment: [
      "Power windows",
      "Sunroof",
      "Navigation system",
      "Tuner/radio",
      "Front camera",
    ],
  };

  return (
    <SectionContainer>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-8/12">
            <div className="p-5">
              <SwiperGalery />
            </div>
            {/* details */}
            <div className="my-6 flex flex-wrap rounded-lg p-4 shadow-lg">
              {Specs.map((item: any) => (
                <div
                  key={item.id}
                  className="flex w-[50%] items-center border-b-2 border-gray-200 p-3"
                >
                  <div className="flex w-[50%] items-center gap-3">
                    <div className="relative h-6 w-6">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={item.image}
                        alt="brand"
                        className="card__icon"
                      />
                    </div>
                    <Typography
                      variant="md"
                      customColor="text-gray-500"
                      className="font-JacquesM"
                    >
                      {item.title}
                    </Typography>
                  </div>
                  <div className="w-[50%]">
                    <Typography variant="md" className="font-JacquesM">
                      {item.name}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            {/* others */}
            <div className=" my-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-lg">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-500 p-3">
                      <Typography
                        variant="lg"
                        customColor="text-white"
                        className="font-JacquesB"
                      >
                        Interior Design
                      </Typography>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-6 w-6 text-white`}
                      />
                    </Disclosure.Button>
                    {Others.interiorDessign.map((item: any, i) => (
                      <Disclosure.Panel
                        key={item.i}
                        className="border-b-2 border-gray-200 py-3 pl-10"
                      >
                        <Typography variant="md" className="font-JacquesM">
                          {item}
                        </Typography>
                      </Disclosure.Panel>
                    ))}
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-500 p-3">
                      <Typography
                        variant="lg"
                        customColor="text-white"
                        className="font-JacquesB"
                      >
                        Exterior Features
                      </Typography>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-6 w-6 text-white`}
                      />
                    </Disclosure.Button>
                    {Others.interiorDessign.map((item: any, i) => (
                      <Disclosure.Panel
                        key={item.i}
                        className="border-b-2 border-gray-200 py-3 pl-10"
                      >
                        <Typography variant="md" className="font-JacquesM">
                          {item}
                        </Typography>
                      </Disclosure.Panel>
                    ))}
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-500 p-3">
                      <Typography
                        variant="lg"
                        customColor="text-white"
                        className="font-JacquesB"
                      >
                        Security & Environment
                      </Typography>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-6 w-6 text-white`}
                      />
                    </Disclosure.Button>
                    {Others.interiorDessign.map((item: any, i) => (
                      <Disclosure.Panel
                        key={item.i}
                        className="border-b-2 border-gray-200 py-3 pl-10"
                      >
                        <Typography variant="md" className="font-JacquesM">
                          {item}
                        </Typography>
                      </Disclosure.Panel>
                    ))}
                  </>
                )}
              </Disclosure>
            </div>
          </div>
          {/* description */}
          <div className="w-4/12 ">
            <div className="sticky top-0 mb-4 p-2">
              <div className=" flex flex-col gap-5 rounded-lg bg-white p-5 shadow-lg">
                <div className="flex flex-col gap-2">
                  <h2 className="font-JacquesSB text-xl">Description</h2>
                  <p className="text-base font-JacquesM">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas volutpat risus pellentesque, accumsan eros ac,
                    fringilla nunc. Ut lacinia lorem quis arcu semper, et
                    ultricies augue ultricies. Duis porta nibh sem, ut sagittis
                    velit lacinia ac. Etiam eu risus ante. Sed vel nulla non
                    mauris bibendum euismod in a ipsum. Vestibulum nulla felis,
                    aliquam nec egestas et,
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-JacquesSB text-xl">Finance</h2>
                  <p className="text-base font-JacquesM">
                    Available from dealer
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-JacquesSB text-xl ">Warranty</h2>
                  <p className="text-base font-JacquesM">12 months</p>
                </div>
                <button className="mt-8 w-full rounded border-none bg-red-500 py-2 px-4 font-OldburgDisplaySB text-xs text-white shadow-sm outline-none hover:bg-red-300 ">
                  BOOK A TEST DRIVE
                </button>
                <button className="hover:bg-gree-300 flex w-full items-center justify-center gap-3 rounded border-none bg-green-500 py-2 px-4 font-OldburgDisplaySB text-xs text-white shadow-sm outline-none">
                  <Image
                    width={20}
                    height={20}
                    src={WhatsAppIcon}
                    alt="WhatsAppIcon"
                  />{" "}
                  WHATSAPP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
