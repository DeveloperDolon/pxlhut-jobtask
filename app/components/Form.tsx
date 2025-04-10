"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValidationSchema } from "../formValidation/formValidationSchema";
import { FromData } from "../types/formTypes";
import FormField from "./FormField";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUserData } from "../store/features/userSlice";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state => state.user));
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FromData>({
    resolver: zodResolver(formValidationSchema),
  });

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(["full_name", "email", "phone"]);
    } else if (step === 2) {
      isValid = await trigger(["street_address", "city", "zip_code"]);
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: FromData) => {
    console.log("Form submitted successfully:", data);
    dispatch(setUserData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="flex flex-col gap-2 max-w-xl mx-auto">
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === stepNumber
                  ? "bg-blue-500 text-white"
                  : step > stepNumber
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-2 mt-1">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold mb-4">
              Personal Information
            </h2>

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
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-2 mt-1">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold mb-4">
              Address Details
            </h2>
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
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-2 mt-1">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold mb-4">
              User Information
            </h2>
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
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="sm:px-4 px-2 md:py-2 py-1 bg-gray-300 rounded-lg md:text-sm text-xs"
            >
              Previous
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="sm:px-4 px-2 md:py-2 py-1 bg-blue-500 text-white rounded-lg ml-auto md:text-sm text-xs"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="sm:px-4 px-2 md:py-2 py-1 bg-green-500 text-white rounded-lg ml-auto md:text-sm text-xs"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MultiStepForm;