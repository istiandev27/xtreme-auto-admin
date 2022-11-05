import React, { useState } from "react";
import { Typography } from "../../elements/Typography";
import { SectionContainer } from "../../elements/SectionContainer";
import { Carform } from "./CarForm";
import { CarsDetails } from "../CarsDetails/CarsDetails";

export const AddCars = () => {
  const [formData, setFormData] = useState("");

  return (
    <SectionContainer>
      <div className="contact">
        <div className="container mx-auto">
          <div className="flex w-full flex-col items-center justify-center gap-10 ">
            <div className="flex flex-col ">
              <Typography variant="h3" className="font-OldburgDisplayB">
                Add Cars
              </Typography>
              <Typography variant="lg" className="font-JacquesM">
                Please doublecheck your inputs
              </Typography>
            </div>
            <div className="flex justify-center ">
              <div className="w-[70%] p-5 ">
                <Carform />
              </div>
              {/* <div className="w-[70%] p-5">
                <CarsDetails  />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
