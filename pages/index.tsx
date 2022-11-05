import { Main } from "../Templates/Main";
import { Meta } from "../layouts/Meta";
import { AddCars } from "../src/components/common/AddCars";

const Home = () => {
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
        <AddCars />
      </Main>
    </>
  );
};

export default Home;
