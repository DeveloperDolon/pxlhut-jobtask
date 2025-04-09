"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { useAppSelector } from "../store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ModeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const mode = useAppSelector((state) => state.mode.mode);

  return (
    <html lang="en" data-theme={mode}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-500 bg-white`}
      >
        {children}
      </body>
    </html>
  );
};

export default ModeProvider;
