import React from "react";
import car from "public/assets/images/Toyota.png";
import calendar from "public/assets/icons/parts/calendar-date.png";
import gear from "public/assets/icons/parts/gearbox.png";
import kilometer from "public/assets/icons/parts/speed.png";
import fuel from "public/assets/icons/parts/fuel-station.png";

import Image from "next/image";
import { Typography } from "../Typography";
import Link from "next/link";

const Cards = () => {
  return (
    <Link href="/cars/cars-details">
      <div className="w-[300px] cursor-pointer rounded-lg shadow-lg">
        <div className="relative h-[180px] w-full">
          <Image layout="fill" objectFit="cover" src={car} alt="car" />
        </div>
        <div className="flex flex-col justify-between gap-3 p-3">
          <div>
            <Typography
              variant="xs"
              customColor="text-red-500"
              className="font-OldburgDisplaySB"
            >
              HYBRID
            </Typography>
            <Typography variant="md" className="font-OldburgDisplayB">
              Toyota Land Cruiser
            </Typography>
          </div>
          <ul className="flex list-none items-center justify-between">
            <li className="flex flex-col items-center">
              <div className="mb-1 flex items-center justify-center rounded-lg p-3 shadow-lg">
                <div className=" relative h-6 w-6">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="card__icon"
                    src={calendar}
                    alt="calendar"
                  />
                </div>
              </div>
              <Typography variant="xs" className="font-JacquesM">
                2013
              </Typography>
            </li>
            <li className="flex flex-col items-center">
              <div className="mb-1 flex items-center  justify-center rounded-lg p-3  shadow-lg">
                <div className=" relative h-6 w-6">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="card__icon"
                    src={gear}
                    alt="gear"
                  />
                </div>
              </div>
              <Typography variant="xs" className="font-JacquesM">
                Auto
              </Typography>
            </li>
            <li className="flex flex-col items-center">
              <div className="mb-1 flex items-center  justify-center rounded-lg p-3  shadow-lg">
                <div className=" relative h-6 w-6">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="card__icon"
                    src={kilometer}
                    alt="kilometer"
                  />
                </div>
              </div>
              <Typography variant="xs" className="font-JacquesM">
                38k km
              </Typography>
            </li>
            <li className="flex flex-col items-center">
              <div className="mb-1 flex items-center  justify-center rounded-lg p-3  shadow-lg">
                <div className=" relative h-6 w-6">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="card__icon"
                    src={fuel}
                    alt="fuel"
                  />
                </div>
              </div>
              <Typography variant="xs" className="font-JacquesM">
                diesel
              </Typography>
            </li>
          </ul>
          <div className="flex items-center justify-between">
            <Typography variant="sm" className="font-JacquesR">
              Used
            </Typography>
            <Typography
              variant="sm"
              customColor="text-red-500"
              className="font-JacquesR"
            >
              ask for price
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
