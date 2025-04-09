"use client";

import { useForm } from "react-hook-form";
import { formValidationSchema } from "../formValidation/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromData } from "../types/formTypes";
import FormField from "./FormField";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FromData>({
    resolver: zodResolver(formValidationSchema),
  });
  return (
    <form className=" mt-10">
      <div className="flex flex-col gap-2 max-w-xl mx-auto">
        <FormField
          type="text"
          label="Full Name"
          placeholder="Full Name"
          name="full_name"
          register={register}
          error={errors.full_name}
        />

        <FormField
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        <FormField
          type="text"
          label="Phone"
          placeholder="Phone"
          name="phone"
          register={register}
          error={errors.phone}
        />
        <FormField
          type="text"
          label="Street Address"
          placeholder="Street Address"
          name="street_address"
          register={register}
          error={errors.street_address}
        />
        <FormField
          type="text"
          label="City"
          placeholder="City"
          name="city"
          register={register}
          error={errors.city}
        />
        <FormField
          type="number"
          placeholder="Zip Code"
          label="Zip Code"
          name="zip_code"
          register={register}
          error={errors.zip_code}
          valueAsNumber
        />
        <FormField
          type="text"
          placeholder="Username"
          label="Username"
          name="username"
          register={register}
          error={errors.username}
        />
        <FormField
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          register={register}
          error={errors.password}
        />
        <FormField
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirm_password"
          register={register}
          error={errors.confirm_password}
        />
        <button
          type="submit"
          onClick={handleSubmit((data) => {
            console.log(data);
          })}
          className="cursor-pointer block px-2 py-1 text-white dark:text-gray-600 dark:bg-white bg-gray-500 w-fit mx-auto rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
