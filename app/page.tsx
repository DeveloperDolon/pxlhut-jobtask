"use client";


import Form from "./components/Form";
import { setMode } from "./store/features/modeSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

export default function Home() {
  const mode = useAppSelector((state) => state.mode.mode);
  const dispatch = useAppDispatch();
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center flex-col md:mt-5 mt-3.5">
        <button
          onClick={() => dispatch(setMode(mode == "dark" ? "light" : "dark"))}
          className="cursor-pointer px-2 py-1 text-white dark:text-gray-600 dark:bg-white bg-gray-500 w-fit mx-auto rounded-lg"
        >
          {mode?.toUpperCase()}
        </button>
        <h2 className="md:text-4xl sm:text-2xl text-xl font-semibold text-center dark:text-gray-100">
          Multi-Step Form with Validation
        </h2>
      </div>

      <Form/>
    </div>
  );
}
