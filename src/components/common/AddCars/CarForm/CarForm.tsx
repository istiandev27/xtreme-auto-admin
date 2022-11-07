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

import useContent from "../../../../../context/useContent";

//icons
import { FiTrash } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

//data for selecting brands
import { BrandList } from "../../../../data/BrandList";

export const Carform = () => {
  //cover image
  const [imageCoverUrl, setImageCoverUrl] = useState<any>(null);
  const [imageCoverProgresspercent, setImageCoverProgresspercent] = useState(0);

  //image array
  const [imagesFiles, setImagesFiles] = useState<any>(null);
  const [imagesUrl, setImagesUrl] = useState<any>([]);
  const [imagesProgresspercent, setImagesProgresspercent] = useState(0);
  const realUrls: any[] = [];
  const { addCar, deleteFile } = useContent();

  //react hook form
  const { register, handleSubmit, control, watch, setValue } =
    useForm<CarInputs>();

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

  //  file upload
  const uploadFile = (event: any) => {
    event.preventDefault();

    const file = event.target[0]?.files[0];
    console.log(event.target[0]?.files[0].type);
    if (!file) return;
    const storageRef = ref(storage, `Cars/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageCoverProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageCoverUrl(downloadURL);
        });
      }
    );
  };
  setValue("imageCover", imageCoverUrl);

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

  //submit all data
  const onSubmit: SubmitHandler<CarInputs> = async (CarInputs) => {
    console.log(CarInputs);
    addCar(CarInputs);
  };

  return (
    <>
      {/* image Cover */}
      <SectionContainer className="flex flex-col gap-5">
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
                onClick={() => deleteFile(imageCoverUrl)}
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
                  onClick={() => deleteFile(url)}
                  className="absolute top-0 right-0 z-10"
                ></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-wrap justify-between gap-4"
          >
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
                className="block h-36 w-full rounded-lg border border-gray-300 py-2 px-4 font-JacquesM text-xs text-black focus:border-gray-400 focus:ring-gray-100 md:text-sm lg:text-md"
              >
                asdasd
              </textarea>
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
