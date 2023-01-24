"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  EMAIL_REGEX_VALIDATION,
  PASSWORD_REGEX_VALIDATION,
} from "@/components/regex";
import { useEffect, useState } from "react";
import { CreateUser } from "@/lib/firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useGenerateData } from "@/components/GenerateLink";
import { useNotification } from "@/components/Toast";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  termsAccept: boolean;
  refId: Number;
  refBy: string;
  uuid: string;
  linkReferrer: string;
}

const initialValues = {
  firstName: "",
  lastName: "",
  country: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  termsAccept: false,
  refId: "",
  refBy: "",
  uuid: "",
  linkReferrer: "",
};
export default function RegisterPageComponent() {
  const [checked, setChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const affid = searchParams.get("affid");
  const params = useGenerateData();
  const notify = useNotification();
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: initialValues });
  const firstName = watch("firstName", "");
  const lastName = watch("lastName", "");
  const email = watch("email", "");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  useEffect(() => {
    try {
      if (password !== confirmPassword && password && confirmPassword) {
        setError("confirmPassword", {
          type: "validate",
          message: "Passwords do not match",
        });
      } else {
        setError("confirmPassword", { type: "validate", message: "" });
      }
    } catch (err) {
      console.log(err);
    }
  }, [password, confirmPassword, setError]);
  const handleGenerate = () => {
    {
      register("refBy");
    }
    setValue("refBy", affid || "");
    {
      register("phone");
    }
    setValue("phone", phoneNumber);
    {
      register("refId");
    }
    setValue("refId", params.userId);
    {
      register("uuid");
    }
    setValue("uuid", params.uuid);
    {
      register("linkReferrer");
    }
    setValue("linkReferrer", params.link);
  };

  async function onSubmit(data: any, event: any) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Please your password do not match!");
      return;
    }
    try {
      await CreateUser(data.email, data.password, data, notify, router);
    } catch (err) {
      console.log("user creation encountered an error", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white md:text-2xl text-xl">
        Welcome into <b>Empire Infinity</b>
      </h1>
      <div className="mx-auto max-w-[455px] mt-5 w-full">
        <Link href={"/en/login"}>
          <div className="bg-[rgb(3,161,126)] text-white p-2 cursor-pointer h-10 mt-12 rounded-t-lg shadow-black shadow-lg">
            <p className="text-xs text-center font-bold leading-6 min-w-fit">
              Already a member? Sign in now!
            </p>
          </div>
        </Link>
        <div className="bg-[rgb(40,48,56)] max-h-[885px] p-8 rounded-b-lg shadow-black shadow-lg">
          <p className="text-2xl leading-none text-white text-center">
            Sign up
          </p>
          <p className="text-sm mt-3 leading-none text-gray-500 text-center">
            to open your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="mx-2 md:mx-10">
              <div className="mt-4 w-full border-b border-gray-500 ">
                <label
                  htmlFor="firstName"
                  className="text-xs font-medium leading-none text-gray-500 "
                >
                  First name
                  <span
                    className={`${
                      errors.firstName ? "text-red-500" : "text-teal-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="bg-[rgb(40,48,56)] appearance-none shadow focus:shadow-outline focus:outline-none text-sm  text-white leading-tight py-1 w-full"
                  {...register("firstName", { required: true, maxLength: 20 })}
                  id="firstName"
                />
              </div>
              {errors.firstName && errors.firstName.type === "required" && (
                <span className="text-xs text-red-500 absolute">
                  This field is required
                </span>
              )}
              {errors.firstName && errors.firstName.type === "maxLength" && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              {!errors.firstName &&
                firstName.length >= 1 &&
                firstName.length <= 20 && (
                  <span className="text-xs text-green-500 absolute">
                    Success
                  </span>
                )}
              {!errors.firstName && firstName.length > 20 && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              <div className="mt-5 w-full border-b border-gray-500 ">
                <label
                  htmlFor="lastName"
                  className="text-xs font-medium leading-none text-gray-500 "
                >
                  Last name
                  <span
                    className={`${
                      errors.lastName ? "text-red-500" : "text-teal-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="bg-[rgb(40,48,56)] appearance-none shadow focus:shadow-outline focus:outline-none text-sm  text-white leading-tight py-1 w-full"
                  {...register("lastName", { required: true, maxLength: 20 })}
                  id="lastName"
                />
              </div>
              {errors.lastName && errors.lastName.type === "required" && (
                <span className="text-xs text-red-500 absolute">
                  This field is required
                </span>
              )}
              {errors.lastName && errors.lastName.type === "maxLength" && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              {!errors.lastName &&
                lastName.length >= 1 &&
                lastName.length <= 20 && (
                  <span className="text-xs text-green-500 absolute">
                    Success
                  </span>
                )}
              {!errors.lastName && lastName.length > 20 && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              <div className="mt-8 focus:mt-5 w-full border-b border-gray-500">
                <label
                  htmlFor="country"
                  className="text-xs font-medium leading-none text-gray-500 "
                >
                  Country
                  <span
                    className={`${
                      errors.country ? "text-red-500" : "text-teal-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>
                <select
                  {...register("country", {
                    required: true,
                  })}
                  id="country"
                  className="bg-[rgb(40,48,56)] appearance-none shadow focus:shadow-outline focus:outline-none text-sm  text-white leading-tight py-1 w-full"
                >
                  {" "}
                  <option value=""></option>
                  <option value="FR">French</option>
                  <option value="EN">English</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              {errors.country && errors.country.type === "required" && (
                <span className="text-xs text-red-500 absolute">
                  This field is required
                </span>
              )}
              <div className="mt-8 w-full border-b border-gray-500 ">
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
                  type="email"
                  className="bg-[rgb(40,48,56)] appearance-none shadow focus:shadow-outline focus:outline-none text-sm  text-white leading-tight py-1 w-full"
                  {...register("email", {
                    required: true,
                    pattern: EMAIL_REGEX_VALIDATION,
                  })}
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
              <div className="mt-8 w-full">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium leading-none text-gray-500 "
                >
                  Phone number
                  <span
                    className={`${
                      errors.phone ? "text-red-500" : "text-teal-500"
                    } ml-1`}
                  >
                    *
                  </span>
                </label>
                <PhoneInput
                  country={"fr"}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  countryCodeEditable={false}
                  enableSearch={true}
                  regions={["europe", "america"]}
                  inputStyle={{
                    backgroundColor: "rgb(40,48,56)",
                    color: "white",
                    fontSize: "0.75rem",
                    padding: "0.5rem 0.75rem",
                    marginLeft: "3.55rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #d1d5db",
                    width: "80%",
                  }}
                />
              </div>
              {!errors.phone && phoneNumber?.length >= 11 && (
                <span className="text-xs text-green-500 absolute">Success</span>
              )}
              <div className="mt-5 w-full ">
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
                    type={showPassword ? "text" : "password"}
                    className="bg-[rgb(40,48,56)] appearance-none shadow focus:shadow-outline focus:outline-none text-sm  text-white leading-tight py-1 w-full"
                    {...register("password", {
                      required: true,
                      min: 8,
                      maxLength: 20,
                      pattern: PASSWORD_REGEX_VALIDATION,
                    })}
                  />
                  <div className="absolute right-0 mt-2 mr-3 cursor-pointer text-white">
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
              <div className="mt-12 w-full ">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium leading-none text-gray-500"
                >
                  Password confirmation
                  <span
                    className={`${
                      confirmPassword === "" && confirmPassword.length >= 1
                        ? "text-red-500"
                        : confirmPassword === password
                        ? "text-green-500"
                        : "text-red-500"
                    } ml-1 text-teal-500`}
                  >
                    *
                  </span>
                </label>
                <div className="relative flex items-center justify-center border-b border-gray-500">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-[rgb(40,48,56)] appearance-none shadow focus:shadow-outline focus:outline-none text-sm  text-white leading-tight py-1 w-full"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === password || "Passwords do not match",
                      min: 8,
                      maxLength: 20,
                      pattern: PASSWORD_REGEX_VALIDATION,
                    })}
                  />
                  <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                    <IconButton
                      className="text-[rgb(3,161,126)] mb-3"
                      aria-label="Toggle Password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    </IconButton>
                  </div>
                </div>
              </div>
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="text-xs text-red-500 absolute">
                    This field is required
                  </span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "maxLength" && (
                  <span className="text-xs text-red-500 absolute">
                    Maximum 20 characters
                  </span>
                )}
              {!errors.confirmPassword &&
                confirmPassword.length >= 8 &&
                confirmPassword.length <= 20 && (
                  <span className="text-xs text-green-500 absolute">
                    Success
                  </span>
                )}
              {!errors.confirmPassword && confirmPassword.length > 20 && (
                <span className="text-xs text-red-500 absolute">
                  Maximum 20 characters
                </span>
              )}
              {errors.confirmPassword && (
                <span className="text-xs text-red-500 absolute">
                  {errors.confirmPassword.message}
                </span>
              )}
              {confirmPassword === "" ? (
                ""
              ) : confirmPassword === password ? (
                <span className="text-xs text-green-500 absolute w-72">
                  Success
                </span>
              ) : (
                ""
              )}
              <div className="flex mt-20 mx-auto max-w-[305px] cursor-pointer">
                <input
                  aria-label="termsAccept"
                  {...register("termsAccept", { required: true })}
                  type="checkbox"
                  onChange={(e) => setChecked(e.target.checked)}
                  defaultChecked={checked}
                  className="cursor-pointer w-4 h-4 border border-black bg-none"
                />

                <div className="flex ">
                  <span className="ml-2 text-sm text-white font-semibold">
                    I agree with
                    <span className="ml-2 text-[rgb(3,161,126)] font-base">
                      Customer Agreement
                    </span>
                  </span>
                </div>
              </div>
              <div className="text-sm text-red-500 max-w-[256px] mx-auto">
                {errors.termsAccept &&
                  errors.termsAccept.type === "required" && (
                    <span className="text-xs text-red-500 absolute">
                      This field is required
                    </span>
                  )}
                {checked
                  ? !errors.termsAccept && (
                      <span className="text-xs text-green-500 absolute">
                        Customer Agreement Accepted
                      </span>
                    )
                  : ""}
              </div>
              <div className="mt-12 mx-auto max-w-[305px]">
                <button
                  disabled={!checked || !phoneNumber}
                  onClick={() => handleGenerate()}
                  type="submit"
                  aria-label="create my account"
                  className="disabled:bg-gray-500 disabled:cursor-not-allowed text-center mx-auto items-center font-semibold leading-none text-white focus:outline-none  bg-[rgb(3,161,126)]  rounded py-4 w-full"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
