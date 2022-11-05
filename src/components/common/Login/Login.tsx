import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../../../context/useAuth";
import { Main } from "../../../../Templates/Main";
import { Meta } from "../../../../layouts/Meta";

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <form
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className={`input ${
                  errors.email && "border-b-2 border-orange-500"
                }`}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className={`input ${
                  errors.password && "border-b-2 border-orange-500"
                }`}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Your password must contain between 4 and 60 characters.
                </p>
              )}
            </label>
          </div>
          <button
            className="w-full rounded bg-[#E50914] py-3 font-semibold"
            onClick={() => setLogin(true)}
            type="submit"
          >
            Sign In
          </button>
          <div className="text-[gray]">
            New to Netflix?{" "}
            <button
              className="cursor-pointer text-white hover:underline"
              onClick={() => setLogin(false)}
              type="submit"
            >
              Sign up now
            </button>
          </div>
        </form>
      </Main>
    </div>
  );
};
