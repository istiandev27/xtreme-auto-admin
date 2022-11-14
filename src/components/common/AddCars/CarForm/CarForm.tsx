import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../../../../../firebase";
// import { v4 } from "uuid";

import { Button } from "../../../elements/Buttons/Button";
import { SectionContainer } from "../../../elements/SectionContainer";
import { Typography } from "../../../elements/Typography";
import CarInputs from "../../../../interfaces/CarInputs";
import Image from "next/image";

import { useHookCars } from "../../../../../hook/cars";

//icons
import { FiTrash } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

//data for selecting brands
import { BrandList } from "../../../../data/BrandList";

export const Carform = () => {
  //cover image

  //image array
  const [imagesFiles, setImagesFiles] = useState<any>(null);
  const [imagesUrl, setImagesUrl] = useState<any>([]);
  const [imagesProgresspercent, setImagesProgresspercent] = useState(0);
  const realUrls: any[] = [];

  const {
    addCar,
    deleteFile,
    loading,
    //single file upload
    uploadFile,
    imageCoverUrl,
    setImageCoverUrl,
    imageCoverProgresspercent,
  } = useHookCars();

  //react hook form
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CarInputs>();

  //for field array
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

  // for multiple file upload
  for (const url in imagesUrl) {
    if (url.length !== 0) {
      realUrls.push(imagesUrl[url]);
    }
  }
  const filesInputHandler = (event: any) => {
    //console.log(event);
    setImagesFiles(event.target.files);
  };

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    for (const file in imagesFiles) {
      if (file.length !== 1) {
        continue;
      }
      if (!imagesFiles[file].name) {
        continue;
      }
      const storageRef = ref(storage, `/Cars/${imagesFiles[file].name}`);
      const uploadTask = uploadBytesResumable(storageRef, imagesFiles[file]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setImagesProgresspercent(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImagesUrl((prevState: any) => [...prevState, downloadURL]);
          });
        }
      );
    }
  };
  setValue("images", imagesUrl);
  setValue("imageCover", imageCoverUrl);

  //delete single file
  const handleDeletefile = (file: any) => {
    deleteFile(file);
    setImageCoverUrl(null);
  };

  //delete files
  const handleDeletefiles = (file: any) => {
    deleteFile(file);
    const index = imagesUrl.indexOf(file); // find a index of the file
    if (index !== -1) {
      imagesUrl.splice(index, 1); // splice or remove from index located
    }
    const newImage = [...imagesUrl];
    setImagesUrl(newImage);
  };

  //submit all data
  const onSubmit: SubmitHandler<CarInputs> = async (CarInputs) => {
    console.log(CarInputs);
    addCar(CarInputs);
  };

  return (
    <>
      {/* image Cover */}
      <SectionContainer className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-4">
          <form onSubmit={uploadFile}>
            <Typography variant="lg" className="font-JacquesM">
              Cover Image
            </Typography>
            <input
              type="file"
              className="block border font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
            />
            <Button type="submit" variant="tertiary" className="mt-1">
              Upload
            </Button>
          </form>
          {/* progesspercent */}
          {!imageCoverUrl && (
            <div className=" flex h-1 w-full flex-col">
              <div
                className="h-1 bg-red-500"
                style={{
                  width: `${imageCoverProgresspercent}%`,
                }}
              ></div>
            </div>
          )}

          {imageCoverUrl && (
            <div className="relative flex ">
              <Image
                src={imageCoverUrl}
                width={200}
                height={200}
                alt="carImages"
                className=" rounded-lg shadow-lg"
              />
              <Button
                variant="tertiary"
                IconOnly={<FiTrash />}
                onClick={() => handleDeletefile(imageCoverUrl)}
                className="absolute top-0 right-0 z-10"
              ></Button>
            </div>
          )}
        </div>

        {/* images */}
        <div className="flex flex-col gap-4">
          <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col">
              <Typography variant="lg" className="font-JacquesM">
                Multiple Images
              </Typography>
              <input
                type="file"
                multiple
                required
                onChange={filesInputHandler}
                accept="image/png, image/jpeg"
                className="block border font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
            </div>
            <Button type="submit" variant="tertiary" className="mt-1">
              Upload
            </Button>
          </form>
          {/* progesspercent */}
          {!imagesUrl.length && (
            <div className=" flex h-1 w-full flex-col">
              <div
                className="h-1 bg-red-500"
                style={{
                  width: `${imagesProgresspercent}%`,
                }}
              ></div>
            </div>
          )}
          {/* display images */}
          <div className="flex flex-wrap gap-4">
            {imagesUrl.map((url: any) => (
              <div key={url} className="relative flex  ">
                <Image
                  src={url}
                  width={200}
                  height={200}
                  alt="carImages"
                  className=" rounded-lg shadow-lg"
                />
                <Button
                  variant="tertiary"
                  IconOnly={<FiTrash />}
                  onClick={() => handleDeletefiles(url)}
                  className="absolute top-0 right-0 z-10"
                ></Button>
              </div>
            ))}
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-wrap justify-between gap-4"
          >
            <div className="flex w-full">
              {/* onSale */}
              <div className="flex w-[50%] items-center gap-5">
                <input type="checkbox" {...register("onSale")} />
                <Typography variant="lg" className="font-JacquesM">
                  on Sale ?
                </Typography>
              </div>
              {/* onFeatured */}
              <div className="flex w-[50%]  items-center gap-5">
                <input type="checkbox" {...register("onFeatured")} />
                <Typography variant="lg" className="font-JacquesM">
                  on Featured ?
                </Typography>
              </div>
            </div>
            {/* make */}
            <div className="flex w-full flex-col">
              <Typography variant="lg" className="font-JacquesM">
                Make
              </Typography>
              <input
                type="text"
                {...register("make", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="make"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* description */}
            <div className="flex w-full flex-col">
              <Typography variant="lg" className="font-JacquesM">
                Description
              </Typography>
              <textarea
                {...register("description", { required: "This is required." })}
                className="block h-36 w-full rounded-lg border border-gray-300 py-2 px-4 font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* year */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Year
              </Typography>
              <input
                type="number"
                {...register("year", {
                  required: "This is required.",
                  valueAsNumber: true,
                })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="year"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>

            {/* finance */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Finance
              </Typography>
              <input
                type="text"
                {...register("finance", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="finance"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* warranty */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Warranty
              </Typography>
              <input
                type="text"
                {...register("warranty", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="warranty"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* model */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Model
              </Typography>
              <input
                type="text"
                {...register("model", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="model"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* wheels */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Wheels
              </Typography>
              <input
                type="text"
                {...register("wheels", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="wheels"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* color */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Color
              </Typography>
              <input
                type="text"
                {...register("color", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="color"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* vehicleType */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                VehicleType
              </Typography>
              <input
                type="text"
                {...register("vehicleType", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="vehicleType"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* kilometers */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Kilometers
              </Typography>
              <input
                type="text"
                {...register("kilometers", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="kilometers"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* exportStatus */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                ExportStatus
              </Typography>
              <input
                type="text"
                {...register("exportStatus", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="exportStatus"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* specs */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Specs
              </Typography>
              <input
                type="text"
                {...register("specs", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="specs"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* gearBox */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                GearBox
              </Typography>
              <input
                type="text"
                {...register("gearBox", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="gearBox"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* fuel */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Fuel
              </Typography>
              <input
                type="text"
                {...register("fuel", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="fuel"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* seat */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                seat
              </Typography>
              <input
                type="number"
                {...register("seat", {
                  required: "This is required.",
                  valueAsNumber: true,
                })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="seat"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* cylinder */}
            <div className="flex  w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Cylinder
              </Typography>
              <input
                type="number"
                {...register("cylinder", {
                  required: "This is required.",
                  valueAsNumber: true,
                })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="cylinder"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* interior */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                Interior
              </Typography>
              <input
                type="text"
                {...register("interior", { required: "This is required." })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="interior"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
            </div>
            {/* price */}
            <div className="flex w-full flex-col xl:w-[48%]">
              <Typography variant="lg" className="font-JacquesM">
                price
              </Typography>
              <input
                type="number"
                {...register("price", {
                  required: "This is required.",
                  valueAsNumber: true,
                })}
                className="block w-full rounded-lg border border-gray-300 py-2 px-4  font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              />
              <ErrorMessage
                errors={errors}
                name="price"
                render={({ message }) => (
                  <Typography variant="sm" customColor="text-red-500">
                    {message}
                  </Typography>
                )}
              />
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
