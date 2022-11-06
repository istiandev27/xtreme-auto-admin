import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../../../../../firebase";
// import { v4 } from "uuid";

import { Button } from "../../../elements/Buttons/Button";
import { SectionContainer } from "../../../elements/SectionContainer";
import { Typography } from "../../../elements/Typography";
import CarInputs from "../../../../interfaces/CarInputs";
import Image from "next/image";

//icons
import { FiTrash } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

//data for selecting brands
import { BrandList } from "../../../../data/BrandList";

export const Carform = () => {
  const [imagesAsFiles, setImagesAsFiles] = useState<any>(null);
  const [imagesAsUrl, setImagesAsUrl] = useState<any>([]);
  const realUrls: any[] = [];

  console.log(imagesAsFiles);
  console.log(imagesAsUrl);

  const [progresspercent, setProgresspercent] = useState(0);

  const { register, handleSubmit, control, watch, setValue } =
    useForm<CarInputs>();

  const {
    fields: interiorFields,
    append: interiorAppend,
    remove: interiorRemove,
  } = useFieldArray({ control, name: "interiorDesigns" });

  const {
    fields: exteriorFields,
    append: exteriorAppend,
    remove: exteriorRemove,
  } = useFieldArray({ control, name: "exteriorDesigns" });

  const {
    fields: securityFields,
    append: securityAppend,
    remove: securityRemove,
  } = useFieldArray({ control, name: "securities" });

  for (const url in imagesAsUrl) {
    console.log(url);
    if (url.length !== 0) {
      realUrls.push(imagesAsUrl[url]);
    }
  }

  const filesInputHandler = (event: any) => {
    //console.log(event);
    setImagesAsFiles(event.target.files);
  };

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();

    for (const file in imagesAsFiles) {
      console.log(file, "type: ", typeof file);

      if (file.length !== 1) {
        continue;
      }

      if (!imagesAsFiles[file].name) {
        continue;
      }

      console.log(imagesAsFiles[file]);

      const storageRef = ref(storage, `/images/${imagesAsFiles[file].name}`);
      const uploadTask = uploadBytesResumable(storageRef, imagesAsFiles[file]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImagesAsUrl((prevState: any) => [...prevState, downloadURL]);
          });
        }
      );
    }
  };

  console.log(imagesAsUrl);
  setValue("images", imagesAsUrl);

  const onSubmit: SubmitHandler<CarInputs> = async (CarInputs) => {
    console.log(CarInputs);

    // addCar(CarInputs);
  };

  return (
    <>
      <SectionContainer>
        <div className="App">
          <h1>Welcome</h1>
          <form onSubmit={formSubmitHandler}>
            <input
              type="file"
              multiple
              required
              accept="image/png, image/jpeg"
              onChange={filesInputHandler}
            />
            <button type="submit">Submit</button>
          </form>
          {!imagesAsUrl.length && (
            <div style={{ width: "200px", height: "3px" }}>
              <div
                style={{
                  height: "3px",
                  backgroundColor: "green",
                  width: `${progresspercent}%`,
                }}
              >
                {progresspercent}%
              </div>
            </div>
          )}
          {imagesAsUrl.map((url: any) => (
            <Image key={url} src={url} alt="item" width={100} height={100} />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-wrap justify-between gap-4"
          >
            {/* title */}
            <div className="flex w-full flex-col">
              <Typography variant="lg" className="font-JacquesM">
                Title
              </Typography>
              <input
                type="text"
                placeholder=""
                {...register("title")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
            </div>
            {/* make */}
            <div className="flex w-full flex-col">
              <Typography variant="lg" className="font-JacquesM">
                Make
              </Typography>
              <select
                {...register("make")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              >
                {BrandList.map((item: any) => (
                  <option key={item.id} value={item.name} className="my-4">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* description */}
            <div className="flex w-full flex-col">
              <Typography variant="lg" className="font-JacquesM">
                Description
              </Typography>
              <textarea
                {...register("description")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></textarea>
            </div>
            {/* year */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Year
              </Typography>
              <input
                type="number"
                {...register("year")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>

            {/* finance */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Finance
              </Typography>
              <input
                type="text"
                {...register("finance")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* warranty */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Warranty
              </Typography>
              <input
                type="text"
                {...register("warranty")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* model */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Model
              </Typography>
              <input
                type="text"
                {...register("model")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* wheels */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Wheels
              </Typography>
              <input
                type="text"
                {...register("wheels")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* color */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Color
              </Typography>
              <input
                type="text"
                {...register("color")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* vehicleType */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                VehicleType
              </Typography>
              <input
                type="text"
                {...register("vehicleType")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* kilometers */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Kilometers
              </Typography>
              <input
                type="text"
                {...register("kilometers")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* exportStatus */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                ExportStatus
              </Typography>
              <input
                type="text"
                {...register("exportStatus")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* specs */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Specs
              </Typography>
              <input
                type="text"
                {...register("specs")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* gearBox */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                GearBox
              </Typography>
              <input
                type="text"
                {...register("gearBox")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* fuel */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Fuel
              </Typography>
              <input
                type="text"
                {...register("fuel")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* seat */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                seat
              </Typography>
              <input
                type="number"
                {...register("seat")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* cylinder */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Cylinder
              </Typography>
              <input
                type="number"
                {...register("cylinder")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* interior */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Interior
              </Typography>
              <input
                type="text"
                {...register("interior")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* price */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                price
              </Typography>
              <input
                type="number"
                {...register("price")}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              ></input>
            </div>
            {/* interiorDesign */}
            <div className="flex  w-full flex-col gap-4">
              <div className="flex items-center gap-4">
                <Typography variant="lg" className="font-JacquesM">
                  Interior Design
                </Typography>
                <Button
                  type="button"
                  onClick={() =>
                    interiorAppend({
                      name: "",
                    })
                  }
                  variant="tertiary"
                  className="justify-center"
                  TrailingIcon={<RiAddFill size={20} />}
                >
                  Add
                </Button>
              </div>
              <div className="flex  flex-wrap justify-between gap-3">
                {interiorFields.map((field, index) => {
                  return (
                    <>
                      <div
                        key={field.id}
                        className="flex w-full gap-3 xl:w-[48%]"
                      >
                        <input
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
                          {...register(
                            `interiorDesigns.${index}.name` as const
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => interiorRemove(index)}
                          variant="tertiary"
                          IconOnly={<FiTrash size={20} />}
                        ></Button>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            {/* exteriorDesigns */}
            <div className="flex  w-full  flex-col gap-4">
              <div className="flex items-center gap-4">
                <Typography variant="lg" className="font-JacquesM">
                  Exterior Design
                </Typography>
                <Button
                  type="button"
                  onClick={() =>
                    exteriorAppend({
                      name: "",
                    })
                  }
                  variant="tertiary"
                  className="justify-center"
                  TrailingIcon={<RiAddFill size={20} />}
                >
                  Add
                </Button>
              </div>
              <div className="flex  flex-wrap justify-between gap-3">
                {exteriorFields.map((field, index) => {
                  return (
                    <>
                      <div
                        key={field.id}
                        className="flex w-full gap-3 xl:w-[48%]"
                      >
                        <input
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
                          {...register(
                            `exteriorDesigns.${index}.name` as const
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => exteriorRemove(index)}
                          variant="tertiary"
                          IconOnly={<FiTrash size={20} />}
                        ></Button>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            {/* securities */}
            <div className="flex  w-full  flex-col gap-4">
              <div className="flex items-center gap-4">
                <Typography variant="lg" className="font-JacquesM">
                  Security & Environment
                </Typography>
                <Button
                  type="button"
                  onClick={() =>
                    securityAppend({
                      name: "",
                    })
                  }
                  variant="tertiary"
                  className="justify-center"
                  TrailingIcon={<RiAddFill size={20} />}
                >
                  Add
                </Button>
              </div>
              <div className="flex  flex-wrap justify-between gap-3">
                {securityFields.map((field, index) => {
                  return (
                    <>
                      <div
                        key={field.id}
                        className="flex w-full gap-3 xl:w-[48%]"
                      >
                        <input
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
                          {...register(`securities.${index}.name` as const)}
                        />
                        <Button
                          type="button"
                          onClick={() => securityRemove(index)}
                          variant="tertiary"
                          IconOnly={<FiTrash size={20} />}
                        ></Button>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              variant="tertiary"
              className="mt-10 w-full justify-center"
            >
              Creat
            </Button>
          </form>
        </div>
      </SectionContainer>
    </>
  );
};
