"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValidationSchema } from "../formValidation/formValidationSchema";
import { FromData } from "../types/formTypes";
import FormField from "./FormField";
import { useAppDispatch } from "../store/store";
import { setUserData } from "../store/features/userSlice";
import { useCreateUserMutation } from "../store/api/userApi";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FromData | null>(null);
  const dispatch = useAppDispatch();
  const [createUser] = useCreateUserMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<FromData>({
    resolver: zodResolver(formValidationSchema),
  });

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(["full_name", "email", "phone"]);
    } else if (step === 2) {
      isValid = await trigger(["street_address", "city", "zip_code"]);
    } else if (step === 3) {
      isValid = await trigger(["username", "password", "confirm_password"]);
    }

    if (isValid) {
      if (step === 3) {
        setFormData(getValues());
      }
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: FromData) => {
    console.log("Form submitted successfully:", data);
    dispatch(setUserData(data));
    reset();
    setStep(1);
    try
    {
      const response = await createUser(data);
      alert(response?.error?.error);
    }
    catch (error) {
      console.error("Error creating user:", error);
    }
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

        {step === 4 && formData && (
          <div className="flex flex-col gap-2 mt-1">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold mb-4 dark:text-gray-100">
              Review Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please review your information before submitting.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2 dark:text-gray-100">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Full Name:</strong> {formData.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Email:</strong> {formData.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2 dark:text-gray-100">Address Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Street Address:</strong> {formData.street_address}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>City:</strong> {formData.city}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Zip Code:</strong> {formData.zip_code}
                  </p>
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2 dark:text-gray-100">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Username:</strong> {formData.username}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Password:</strong> ••••••••
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="sm:px-4 px-2 md:py-2 py-1 bg-blue-500 text-white rounded-lg ml-auto md:text-sm text-xs"
            >
              {step === 3 ? "Review" : "Next"}
            </button>
          ) : (
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={prevStep}
                className="sm:px-4 px-2 md:py-2 py-1 bg-gray-300 rounded-lg md:text-sm text-xs"
              >
                Back to Edit
              </button>
              <button
                type="submit"
                className="sm:px-4 px-2 md:py-2 py-1 bg-green-500 text-white rounded-lg md:text-sm text-xs"
              >
                Confirm & Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default MultiStepForm;