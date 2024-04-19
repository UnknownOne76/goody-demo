import { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { Outfit } from "next/font/google";
import TitleComponent from "../title";
import CartProducts from "./cartProduct";
import TotalComponent from "./total";
import { useProductContext } from "@/contexts/productContext";
import { useTheme } from "@/contexts/themeContext";
const outfit = Outfit({ subsets: ["latin"], weight: "700" });

const SwipeableComponent = () => {
  const { themeMode } = useTheme();
  const { cart } = useProductContext();
  const [startY, setStartY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(0);

  useEffect(() => {
    isVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [isVisible]);

  const handleTouchStart = (e: any) => {
    setStartY(e.touches[0].clientY);
    setStartX(e.touches[0].clientX);
    setIsVisible(true);
  };

  const handleTouchMove = (e: any) => {
    const deltaY = e.touches[0].clientY - startY;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      setExpandedHeight(Math.max(deltaY, 0));
    }
  };

  const handleTouchEnd = () => {
    const difference = startY,
      windowHeight = window.innerHeight;

    if (Math.abs(difference) > 0) {
      const expandedHeight = windowHeight * 0.8;
      setExpandedHeight(expandedHeight);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setExpandedHeight(0);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" />
      )}
      <div
        style={{
          position: "fixed",
          bottom: isVisible ? 0 : -50,
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          width: "100%",
          height: expandedHeight ? `${expandedHeight}px` : 100,
          backgroundColor: themeMode === "dark" ? "#404040" : "white",
          transition: "height 0.5s ease-in-out",
          zIndex: 20,
          boxShadow:
            "inset 0 0 2px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3)",
        }}
        className={`rounded-t-3xl shadow-2xl ${outfit.className} ${
          themeMode === "dark" ? "bg-[#404040] text-[#FCFCFF]" : ""
        }`}
      >
        <div className={`flex relative bottom-10`}>
          <div
            className={`flex w-[28px] h-[28px] ${
              themeMode === "dark"
                ? "bg-white text-black"
                : "bg-[#FFC633] text-white"
            } rounded-full items-center justify-center absolute top-0 left-12 text-[16px] z-20`}
          >
            {Object.keys(cart)?.length}
          </div>
          <div
            onClick={() => {
              setExpandedHeight(0), setIsVisible(false);
            }}
            className={`flex flex-col justify-center items-center rounded-full ${
              themeMode === "dark" ? "bg-[#404040]" : "bg-[#F38219]"
            } w-[65px] h-[65px] z-10 transition-all ease-out duration-300`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <FaShoppingBasket
              color={themeMode === "dark" ? "#6D6D6D" : "white"}
              size={37}
            />
          </div>
        </div>
        <TitleComponent
          style={`flex w-full text-[32px] justify-start p-5`}
          text="Checkout"
        />
        <div className="flex flex-col w-full h-full justify-start overflow-auto p-5">
          <div className="flex flex-col w-full gap-6">
            {Object.keys(cart)?.map((x) => {
              const cartProduct = cart[x];
              return (
                <div key={x}>
                  <CartProducts
                    src={cartProduct?.src || ""}
                    name={cartProduct?.name || ""}
                    price={cartProduct?.price || 0}
                    id={cartProduct?.id || 0}
                    quantity={cartProduct?.quantity || 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <TotalComponent />
      </div>
    </>
  );
};

export default SwipeableComponent;
