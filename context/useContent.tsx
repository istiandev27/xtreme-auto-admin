import { useRouter } from "next/router";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import CarInputs from "../src/interfaces/CarInputs";

interface IContent {
  cars: DocumentData[] | null;
  addCar: (CarInputs: CarInputs) => Promise<void>;
  editCar: () => Promise<void>;
  deletecar: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const ContentContext = createContext<IContent>({
  cars: [],
  addCar: async () => {},
  editCar: async () => {},
  deletecar: async () => {},
  error: null,
  loading: false,
});

interface ContentProviderProps {
  children: React.ReactNode;
}

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [cars, setCars] = useState<DocumentData[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "cars");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });

      setCars(docs);
    })();

    console.log(cars);
  }, []);

  const addCar = async (CarInputs: CarInputs) => {
    const dbRef = collection(db, "cars");
    setLoading(true);
    await addDoc(dbRef, CarInputs)
      .then(() => {
        console.log("Document has been added successfully");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const editCar = async () => {
    setLoading(true);
  };

  const deletecar = async () => {
    setLoading(true);
  };

  const memoedValue = useMemo(
    () => ({ cars, addCar, editCar, deletecar, error, loading }),
    [loading, error]
  );

  return (
    <ContentContext.Provider value={memoedValue}>
      {children}
    </ContentContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useContent() {
  return useContext(ContentContext);
}
