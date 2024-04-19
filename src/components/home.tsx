import ListingComponent from "./products/list";
import TitleComponent from "./title";
import { Outfit } from "next/font/google";
import { products, filterSection } from "../utils/mock";
import ProductsComponents from "./products/products";
const outfit = Outfit({ subsets: ["latin"], weight: "700" });

interface Product {
  name: string;
  type?: string;
  price: number;
  left: number;
  src: string;
  id: number;
  quantity: number;
}

interface ListTypes {
  name: string;
  type: string;
  id: number;
}

export const HomePage = () => {
  const productsObject: { [key: string]: Product | undefined } = {};
  products.forEach((product) => {
    productsObject[product.id.toString()] = product;
  });

  const filtersObject: { [key: string]: ListTypes | undefined } = {};
  filterSection.forEach((typeId) => {
    filtersObject[typeId.id.toString()] = typeId;
  });

  return (
    <div
      className={`flex flex-col w-full justify-start m-5 ${outfit.className}`}
    >
      <TitleComponent
        style={`w-[300px] h-[40px] text-[28px]`}
        text="Discover your goody"
      />
      <ListingComponent data={filtersObject} />
      <ProductsComponents product={productsObject} />
    </div>
  );
};

export default HomePage;
