import Router, { useRouter } from "next/router";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db, storage } from "../firebase";
import CarInputs from "../src/interfaces/CarInputs";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import router from "next/router";
import { resourceLimits } from "worker_threads";

export const useHookCars = () => {
  const [cars, setCars] = useState<DocumentData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //single file upload
  const [imageCoverUrl, setImageCoverUrl] = useState<any>(null);
  const [imageCoverProgresspercent, setImageCoverProgresspercent] = useState(0);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const colRef = collection(db, "cars");
  //       const snapshots = await getDocs(colRef);
  //       const docs = snapshots.docs.map((doc) => {
  //         const data = doc.data();
  //         data.id = doc.id;
  //         return data;
  //       });
  //       setCars(docs);
  //     } catch (error) {
  //       setError("Failed to load All Cars");
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //       console.log(cars);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const addCar = async (CarInputs: CarInputs) => {
    try {
      const dbRef = collection(db, "cars");
      await addDoc(dbRef, CarInputs).then(() => {
        console.log("Document has been added successfully");
        router.push("/cars");
      });
    } catch (error) {
      setError("Failed to load All Cars");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editCar = async () => {
    setLoading(true);
  };

  const deletecar = async () => {
    setLoading(true);
  };

  // single file upload
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

  // delete image
  const deleteFile = async (file: any) => {
    try {
      const pictureRef = ref(storage, file);
      deleteObject(pictureRef);
      // File deleted successfully
      console.log("File deleted successfully");
    } catch (error) {
      setError("File deleted not successfully");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useMemo(
    () => ({
      cars,
      addCar,
      editCar,
      deletecar,
      deleteFile,
      error,
      loading,
      //single file upload
      uploadFile,
      imageCoverUrl,
      imageCoverProgresspercent,
    }),
    [cars, error, loading, imageCoverUrl, imageCoverProgresspercent]
  );

  return {
    cars,
    addCar,
    editCar,
    deletecar,
    deleteFile,
    error,
    loading,
    //single file upload
    uploadFile,
    imageCoverUrl,
    setImageCoverUrl,
    imageCoverProgresspercent,
  };
};
