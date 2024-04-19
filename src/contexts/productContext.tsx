import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Product {
  name: string;
  type?: string;
  price: number;
  left: number;
  quantity: number;
  src: string;
  id: number;
}

interface ProductContext {
  cart: { [key: string]: Product | undefined };
  setCart: Dispatch<SetStateAction<{ [key: string]: Product | undefined }>>;
  activeType: string;
  setIsActiveType: Dispatch<SetStateAction<string>>;
}

interface ProductTypes {
  children: React.ReactNode;
}

export const ProductContext = createContext<ProductContext>(
  {} as ProductContext
);

export const ProductContextProvider = ({ children }: ProductTypes) => {
  const [cart, setCart] = useState<{ [key: string]: Product | undefined }>({});
  const [activeType, setIsActiveType] = useState('');

  return <ProductContext.Provider value={{cart, setCart, activeType, setIsActiveType}}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => useContext(ProductContext);
