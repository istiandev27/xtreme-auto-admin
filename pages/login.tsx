import { Main } from "../Templates/Main";
import { Meta } from "../layouts/Meta";
import { Login } from "../src/components/common/Login";

const LoginPage = () => {
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
        <Login />
      </Main>
    </>
  );
};

export default LoginPage;
