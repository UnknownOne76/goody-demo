import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useTheme } from "@/contexts/themeContext";

interface Props {
  children: React.ReactNode;
}

export const MainLayOut = ({ children }: Props) => {

  const { themeMode } = useTheme();

  return (
    <>
      <Header />
      <main className={`flex w-full justify-center items-center ${themeMode === 'dark' ? 'bg-[#2D2D2D] text-[#FCFCFF]' : ''}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayOut;
