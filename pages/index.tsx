import { Main } from "../Templates/Main";
import { Meta } from "../layouts/Meta";
import { AddCars } from "../src/components/common/AddCars";
import { useHookCars } from "../hook/cars";

const Home = () => {
  const { loading } = useHookCars();

  return (
    <>
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        {loading ? <p>loading...</p> : <AddCars />}
      </Main>
    </>
  );
};

export default Home;
