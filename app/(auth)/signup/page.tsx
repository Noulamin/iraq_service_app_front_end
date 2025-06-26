"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@/components/LoadingButton";
import UseSignUp from "@/hooks/useSignUp";
import Link from "next/link";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialRegisterAlertState: [string, string] = ["", ""];
  const [registerAlertState, setRegisterAlertState] = useState<
    [string, string]
  >(initialRegisterAlertState);

  const requiredMessage = "This field is required.";

  const registerFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(requiredMessage),
      last_name: Yup.string().required(requiredMessage),
      email: Yup.string().required(requiredMessage),
      password: Yup.string().required(requiredMessage),
    }),
    onSubmit: (values) => {
      UseSignUp(values, setIsLoading, setRegisterAlertState);
    },
  });

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          className="space-y-2"
          noValidate
          onSubmit={registerFormik.handleSubmit}
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            <div className="flex"> <div>Sign up to&nbsp;</div>  <div className="font-bold"> <div className="flex"><div>Toolz&nbsp;</div> <div>Market</div></div> </div></div>
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First name
            </label>
            <input
              type="first_name"
              name="first_name"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Rick"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />

            {registerFormik.touched.first_name &&
              registerFormik.errors.first_name ? (
              <p className="text-danger text-sm">
                {registerFormik.errors.first_name}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last name
            </label>
            <input
              type="last_name"
              name="last_name"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Novak"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />

            {registerFormik.touched.last_name &&
              registerFormik.errors.last_name ? (
              <p className="text-danger text-sm">
                {registerFormik.errors.last_name}
              </p>
            ) : null}
          </div>

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
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />

            {registerFormik.touched.email && registerFormik.errors.email ? (
              <p className="text-danger text-sm">
                {registerFormik.errors.email}
              </p>
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
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />

            {registerFormik.touched.password &&
              registerFormik.errors.password ? (
              <p className="text-danger text-sm">
                {" "}
                {registerFormik.errors.password}
              </p>
            ) : null}
          </div>

          <LoadingButton
            isDisabled={isLoading}
            title="Create your account"
            isLoading={isLoading}
            onClick={() => { }}
          />
          {registerAlertState[0] != "" && (
            <p
              style={{ color: registerAlertState[1] }}
              className="w-full p-0 m-0 font-semibold text-center text-sm text-red"
            >
              {registerAlertState[0]}
            </p>
          )}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?{" "}
            <Link href={`/signin`} legacyBehavior>
              <a className="text-blue-700 cursor-pointer hover:underline dark:text-blue-500">
                Login
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
