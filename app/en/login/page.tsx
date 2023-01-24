"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  EMAIL_REGEX_VALIDATION,
  PASSWORD_REGEX_VALIDATION,
} from "@/components/regex";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNotification } from "@/components/Toast";
import { logIn } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IFormInput {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const notify = useNotification();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: initialValues });
  const email = watch("email", "");
  const password = watch("password");

  async function onSubmit(data: any, event: any) {
    event.preventDefault();
    try {
      await logIn(data.email, data.password, notify, router);
    } catch (err) {
      console.log("Login failed !", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white md:text-2xl text-xl">
        Welcome into <b>Empire Infinity</b>
      </h1>

      <div className="mx-auto max-w-[455px] mt-5 w-full">
        <Link href={"/en/register"}>
          <div className="bg-[rgb(3,161,126)] text-white p-2 cursor-pointer h-10 mt-12 rounded-t-lg shadow-black shadow-lg">
            <p
              aria-label="Login to your account"
              className="text-sm text-center font-bold leading-6 min-w-fit"
            >
              Not a member ? Sign up now!
            </p>
          </div>
        </Link>
        <div className="bg-[rgb(40,48,56)] h-[455px] p-8 rounded-b-lg shadow-black shadow-lg">
          <p className="text-2xl leading-none text-white text-center">
            Sign in
          </p>
          <p className="text-sm mt-3 leading-none text-gray-500 text-center">
            to access your account
          </p>
          <div className="mx-2 md:mx-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5 w-full border-b border-gray-500 ">
                <label
                  htmlFor="email"
                  className="text-xs font-medium leading-none text-gray-500 "
                >
                  Email
                  <span
                    className={`${
                      errors.email ? "text-red-500" : "text-teal-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: EMAIL_REGEX_VALIDATION,
                  })}
                  type="email"
                  className="bg-[rgb(40,48,56)]  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mt-2"
                />
              </div>
              {errors.email && errors.email.type === "required" && (
                <span className="text-xs text-red-500 absolute">
                  This field is required
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-xs text-red-500 absolute">
                  Email is not valid
                </span>
              )}
              {!errors.email && email.length >= 1 && (
                <span className="text-xs text-green-500 absolute">Success</span>
              )}
              <div className="mt-5 w-full">
                <label
                  htmlFor="password"
                  className="text-xs font-medium leading-none text-gray-500"
                >
                  Password{" "}
                  <span
                    className={`${
                      errors.password ? "text-red-500" : "text-teal-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>
                <div className="relative flex items-center justify-center border-b border-gray-500">
                  <input
                    id="password"
                    {...register("password", {
                      required: true,
                      min: 8,
                      maxLength: 20,
                      pattern: PASSWORD_REGEX_VALIDATION,
                    })}
                    type={showPassword ? "text" : "password"}
                    className="bg-[rgb(40,48,56)] focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mt-2"
                  />
                  <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                    <IconButton
                      className="text-[rgb(3,161,126)] mb-3"
                      aria-label="Toggle Password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    </IconButton>
                  </div>
                </div>
              </div>
              {errors.password && errors.password.type === "required" && (
                <span className="text-xs text-red-500 absolute">
                  This field is required
                </span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="text-xs text-red-500 absolute w-72">
                  Password. Min 8 symbols, at least 1 lowercase letter, at least
                  1 upper-case, at least 1 non-letter
                </span>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              {!errors.password &&
                password.length >= 8 &&
                password.length <= 20 && (
                  <span className="text-xs text-green-500 absolute">
                    Success
                  </span>
                )}
              {!errors.password && password.length > 20 && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              {!errors.password &&
                password.length >= 1 &&
                password.length < 8 && (
                  <span className="text-xs text-red-500 absolute w-72">
                    Password. Min 8 symbols, at least 1 lowercase letter, at
                    least 1 upper-case, at least 1 non-letter
                  </span>
                )}
              <div className="mt-8">
                <button
                  type="submit"
                  role="button"
                  aria-label="create my account"
                  className="text-sm text-center mx-auto mt-3 items-center font-semibold leading-none text-white focus:outline-none bg-[rgb(3,161,126)]  rounded py-3 w-full"
                >
                  Sign in
                </button>
                <div className="text-center items-center text-[rgb(3,161,126)] mt-5 text-sm font-base">
                  <h1>Forgot your password?</h1>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
