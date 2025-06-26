"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@/components/LoadingButton";
import UseForgetPassword from "@/hooks/useForgetPassword";
import Link from "next/link";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialForgetAlertState: [string, string] = ["", ""];
  const [forgetAlertState, setForgetAlertState] = useState<[string, string]>(
    initialForgetAlertState
  );

  const requiredMessage = "This field is required.";

  const forgetFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(requiredMessage),
    }),
    onSubmit: (values) => {
      UseForgetPassword(values, setIsLoading, setForgetAlertState);
    },
  });

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          className="space-y-3"
          noValidate
          onSubmit={forgetFormik.handleSubmit}
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Reset your password
          </h5>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              onChange={forgetFormik.handleChange}
              onBlur={forgetFormik.handleBlur}
            />

            {forgetFormik.touched.email && forgetFormik.errors.email ? (
              <p className="text-danger text-sm">{forgetFormik.errors.email}</p>
            ) : null}
          </div>

          <LoadingButton
            isDisabled={isLoading}
            title="Submit"
            isLoading={isLoading}
            onClick={() => {}}
          />
          {forgetAlertState[0] != "" && (
            <p
              style={{ color: forgetAlertState[1] }}
              className="w-full p-0 m-0 font-semibold text-center text-sm text-red"
            >
              {forgetAlertState[0]}
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
