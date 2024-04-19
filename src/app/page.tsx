"use client";
import MainLayOut from "@/components/layout/main";
import HomePage from "@/components/home";
import { ProductContextProvider } from "@/contexts/productContext";
import { ThemeProvider } from "@/contexts/themeContext";

export default function MainPage() {
  return (
    <ThemeProvider>
    <ProductContextProvider>
      <MainLayOut>
        <HomePage />
      </MainLayOut>
    </ProductContextProvider>
    </ThemeProvider>
  );
}
