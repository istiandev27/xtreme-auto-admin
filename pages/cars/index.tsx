import { Main } from "../../Templates/Main";
import { Meta } from "../../layouts/Meta";
import { CarList } from "../../src/components/common/CarList";

const Index = () => {
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
        <CarList />
      </Main>
    </>
  );
};

export default Index;
