
import { createSlice } from "@reduxjs/toolkit";

export type Mode = {
    mode: "dark" | "light";
};

const initialState: Mode = {
    mode: "dark"
};

export const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { setMode } = modeSlice.actions;
export const modeReducer = modeSlice.reducer;
