import { useProductContext } from "@/contexts/productContext";
import TitleComponent from "../title";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
import Modal from "./modal";
import { useTheme } from "@/contexts/themeContext";
const inter = Inter({ subsets: ["latin"], weight: "700" });

export const TotalComponent = () => {
  const { themeMode } = useTheme();
  const { cart } = useProductContext();
  const [isOpen, setIsOpen] = useState(false);
  const { Canvas } = useQRCode();
  let total = Object.entries(cart)?.map(([key, x]) => {
    if (!x) return;
    return x?.price * x?.quantity;
  });

  const toggleState = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full justify-start p-5 gap-2">
      <div className="w-[100%] h-[1px] bg-[#ACACAC]"></div>
      <div className="flex w-full justify-between">
        <TitleComponent
          style={`text-[24px] ${inter.className}`}
          text="Нийт: "
        />
        <TitleComponent
          style={`text-[24px] ${inter.className} transition-all ease-out duration-300`}
          text={`₮${total
            ?.reduce((a, b) => (a || 0) + (b || 0), 0)
            ?.toLocaleString()}`}
        />
      </div>
      <TitleComponent
        style={`text-[12px] ${inter.className}`}
        text="*Е-Баримт оролцоогүй."
      />
      <div
        className={`flex w-[250px] h-[56px] rounded-xl ${themeMode === 'dark' ? 'bg-white text-black' : 'bg-[#F38219] text-white'} justify-center items-center mx-auto mt-5 transition-all ease-in duration-200 ${
          Object.keys(cart)?.length === 0
            ? "pointer-events-none opacity-50"
            : ""
        }`}
        onClick={toggleState}
      >
        <TitleComponent
          style={`text-[16px] ${inter.className}`}
          text="Check-out"
        />
      </div>
      <Modal isOpen={isOpen} onClose={toggleState}>
        <Canvas
          text={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 2,
            width: 200,
            color: {
              dark: "#FFFFFF",
              light: "#F38219",
            },
          }}
        />
        <TitleComponent
          style="text-[12px] pt-2 text-[#F38219]"
          text="Scan this QPAY"
        />
      </Modal>
    </div>
  );
};

export default TotalComponent;
