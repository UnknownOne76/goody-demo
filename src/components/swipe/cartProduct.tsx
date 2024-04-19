import Image from "next/legacy/image";
import TitleComponent from "../title";
import { AiOutlineMinus } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useProductContext } from "@/contexts/productContext";
import { products } from "@/utils/mock";
import { useTheme } from "@/contexts/themeContext";

interface CartProductProps {
  src: string;
  name: string;
  price: number;
  id: number;
  quantity: number;
}

export const CartProducts = ({
  src,
  name,
  price,
  id,
  quantity,
}: CartProductProps) => {
  const {themeMode } = useTheme();
  const { cart, setCart } = useProductContext();
  let limit = 5;

  const increaseProd = (id: number) => {
    const productId = cart[id?.toString()];
    if (!productId) return;

    const updatedCart = { ...cart };
    updatedCart[id?.toString()] = {
      ...productId,
      quantity: productId?.quantity + 1,
    };
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products[productIndex].left -= 1;
    }

    return setCart(updatedCart);
  };

  const decreaseProd = (id: number) => {
    const productId = cart[id?.toString()];
    if (!productId) return;
    const updatedCart = { ...cart };
    updatedCart[id?.toString()] = {
      ...productId,
      quantity: productId?.quantity - 1,
    };
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products[productIndex].left += 1;
    }

    return setCart(updatedCart);
  };

  const removeProduct = (product: number) => {
    if (!cart[product?.toString()]) return;

    const removedProduct = cart[product?.toString()];
    const removedQuantity = removedProduct?.quantity || 0;
    const productIndex = products.findIndex((p) => p.id === product);
    if (productIndex !== -1) {
      products[productIndex].left += removedQuantity;
    }

    const updatedCart = { ...cart };
    delete updatedCart[product?.toString()];
    setCart(updatedCart);
  };

  return (
    <div
      className="flex w-[342px] h-[140px] pt-5 shadow-xl relative"
      style={{
        boxShadow:
          "inset 0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="flex absolute right-0 top-0 p-5"
        onClick={() => removeProduct(id)}
      >
        <MdOutlineCancel size={36} color={themeMode === 'dark' ? 'white' : '#6D6D6D'} />
      </div>
      <div className="w-[100px] h-[100px] pl-4">
        <Image
          src={src}
          alt={`Img-${id}`}
          width={100}
          height={100}
          layout="fixed"
          priority
        />
      </div>
      <div className="flex flex-col w-full justify-start pl-14">
        <TitleComponent style="text-[16px]" text={name} />
        <div className="text-[24px]">₮{price.toLocaleString()}</div>
        <div className="flex w-full gap-6">
          <div
            className={`flex w-[36px] h-[36px] rounded-xl items-center justify-center border-2 opacity-1 ${
              cart[id]?.quantity === 0 ? "pointer-events-none opacity-0" : ""
            } transition-all ease-out duration-300 ${themeMode === 'dark' ? 'bg-[#6D6D6D] border-2 border-[#6D6D6D]' : ''}`}
            onClick={() => decreaseProd(id)}
          >
            <AiOutlineMinus size={24} color={themeMode === 'dark' ? 'white' : '#6D6D6D'} />
          </div>
          <div className="text-[24px]">{quantity}</div>
          <div
            className={`flex w-[36px] h-[36px] rounded-xl items-center justify-center border-2 opacity-1 ${
              cart[id]?.quantity === limit || products[id]?.left === 0
                ? "pointer-events-none opacity-0"
                : ""
            } transition-all ease-out duration-300  ${themeMode === 'dark' ? 'bg-[#6D6D6D] border-2 border-[#6D6D6D]' : ''}`}
            onClick={() => increaseProd(id)}
          >
            <IoAddSharp size={24} color={themeMode === 'dark' ? 'white' : '#6D6D6D'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
