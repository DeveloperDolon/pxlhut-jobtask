import { z } from "zod";

export const setpOneValidation = {
    full_name: z.string().min(3, {message: "Name must be at least 3 characters long"}),
    email: z.string().email({message: "Invalid email address"}),
    phone: z.string().min(10, {message: "Phone number must be at least 10 digits long"}),
};

export const setpTwoValidation = {
    street_address: z.string().min(3, {message: "Street address must be at least 3 characters long"}),
    city: z.string().min(3, {message: "City must be at least 3 characters long"}),
    zip_code: z.number().min(5, {message: "Zip code must be at least 5 digits long"}),
}

export const setpThreeValidation = {
    username: z.string().min(3, {message: "Username must be at least 3 characters long"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
    confirm_password: z.string().min(8, {message: "Confirm password must be at least 8 characters long"}),
};