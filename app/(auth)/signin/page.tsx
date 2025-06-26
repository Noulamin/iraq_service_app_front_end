"use client";
import { useState } from "react";
import UseSignIn from "@/hooks/useSignIn";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@/components/LoadingButton";
import Link from "next/link";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialLoginAlertState: [string, string] = ["", ""];
  const [loginAlertState, setLoginAlertState] = useState<[string, string]>(
    initialLoginAlertState
  );

  const requiredMessage = "This field is required.";

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(requiredMessage),
      password: Yup.string().required(requiredMessage),
    }),
    onSubmit: (values) => {
      UseSignIn(values, setIsLoading, setLoginAlertState);
    },
  });

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          className="space-y-5"
          noValidate
          onSubmit={loginFormik.handleSubmit}
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            <div className="flex"> <div>Sign in to&nbsp;</div>  <div className="font-bold"> <div className="flex"><div>Toolz&nbsp;</div> <div>Market</div></div> </div></div>
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />

            {loginFormik.touched.email && loginFormik.errors.email ? (
              <p className="text-danger text-sm">{loginFormik.errors.email}</p>
            ) : null}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />

            {loginFormik.touched.password && loginFormik.errors.password ? (
              <p className="text-danger text-sm">
                {" "}
                {loginFormik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <Link href={`/forgotpassword`} legacyBehavior>
              <a className="ms-auto cursor-pointer text-sm text-blue-700 hover:underline dark:text-blue-500">
                Lost Password?
              </a>
            </Link>
          </div>
          <LoadingButton
            isDisabled={isLoading}
            title="Login to your account"
            isLoading={isLoading}
            onClick={() => { }}
          />
          {loginAlertState[0] != "" && (
            <p
              style={{ color: loginAlertState[1] }}
              className="w-full p-0 m-0 font-semibold text-center text-sm text-red"
            >
              {loginAlertState[0]}
            </p>
          )}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link href={`/signup`} legacyBehavior>
              <a className="text-blue-700 cursor-pointer hover:underline dark:text-blue-500">
                Create account
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
