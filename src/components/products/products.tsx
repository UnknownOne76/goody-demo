"use client";
import TitleComponent from "../title";
import Image from "next/legacy/image";
import { IoAddSharp } from "react-icons/io5";
import { useProductContext } from "@/contexts/productContext";
import { products } from "@/utils/mock";
import { useMemo } from "react";
import { useTheme } from "@/contexts/themeContext";

interface Product {
  name: string;
  type?: string;
  price: number;
  left: number;
  src: string;
  id: number;
  quantity: number;
}

interface ProductType {
  product: { [key: string]: Product | undefined };
}

export const ProductsComponents = ({ product }: ProductType) => {
  const { themeMode } = useTheme();
  const { activeType, cart, setCart } = useProductContext();
  let limit = 5;

  const filteredProduct = useMemo(() => {
    if (activeType !== "") {
      return Object.fromEntries(
        Object.entries(product).filter(([key, x]) => x?.type === activeType)
      );
    } else {
      return product;
    }
  }, [activeType, product]);

  const addToProduct = (product: Product | undefined) => {
    if (!product) return;
    const existing = cart[product?.id?.toString()];

    if (existing) {
      const addToExist = { ...cart };
      addToExist[product?.id?.toString()] = {
        ...existing,
        quantity: existing?.quantity + 1,
      };
      setCart(addToExist);
    } else {
      const newOne = { ...cart };
      newOne[product?.id?.toString()] = { ...product, quantity: 1 };
      setCart(newOne);
    }

    const productIndex = products.findIndex((p) => p.id === product?.id);
    if (productIndex !== -1 && cart[productIndex]?.quantity === limit) {
      return;
    } else {
      products[productIndex].left -= 1;
    }
  };

  return (
    <div className={`grid grid-cols-2 grid-flow-row gap-4 pt-5`}>
      {Object.entries(filteredProduct)?.map(([key, x]) => {
        if (!x) return;
        return (
          <div
            key={key}
            className={`flex flex-col w-[159px] h-[230px] rounded-lg shadow-xl p-5 ${themeMode === 'dark' ? 'bg-[#262626] text-[#D9D9D9]' : ''}`}
            style={{
              boxShadow:
                "inset 0 0 5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TitleComponent text={x?.name} style="text-[16px] pb-4" />
            <div className="w-[100px] h-[100px]">
              <Image
                src={x?.src || ""}
                alt={x?.name || "Image"}
                width={100}
                height={110}
                layout="responsive"
                priority
              />
            </div>
            <div className="flex w-full pt-5 justify-between items-center">
              <div className="flex flex-col">
                <div className="text-[14px]">
                  ₮{x?.price !== undefined ? x?.price.toLocaleString() : 0}
                </div>
                <div className="text-[12px] opacity-45">Үлдсэн: {x?.left}</div>
              </div>
              <div
                className={`flex w-[36px] h-[36px] ${themeMode === 'dark' ? 'bg-[#6D6D6D]' : 'bg-[#F38219]'} rounded-xl items-center justify-center shadow-xl transition-all ease-in-out duration-300 ${
                  x?.left === 0 || cart[x?.id]?.quantity === limit
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => addToProduct(x)}
              >
                <IoAddSharp size={25} color="white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsComponents;
