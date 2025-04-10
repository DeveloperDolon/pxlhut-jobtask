
import { createSlice } from "@reduxjs/toolkit";

type UserData = {
    full_name: string;
    email: string;
    phone: string;
    street_address: string;
    city: string;
    zip_code: number;
    username: string;
    password: string;
  };

const initialState: UserData = {
    full_name: '',
    email: '',
    phone: '',
    street_address: '',
    city: '',
    zip_code: 0,
    username: '',
    password: '',
};  

export const userSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.full_name = action.payload.full_name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.street_address = action.payload.street_address;
            state.city = action.payload.city;
            state.zip_code = action.payload.zip_code;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
    },
});

export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
