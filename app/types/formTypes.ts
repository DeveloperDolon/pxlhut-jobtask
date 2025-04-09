import { FieldError, UseFormRegister } from "react-hook-form";

export type FromData = {
  full_name: string;
  email: string;
  phone: string;
  street_address: string;
  city: string;
  zip_code: number;
  username: string;
  password: string;
  confirm_password: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FromData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
  label?: string;
};

export type ValidFieldNames =
|"full_name"
|"email"
|"phone"
|"street_address"
|"city"
|"zip_code"
|"username"
|"password"
|"confirm_password";
