import { useProductContext } from "@/contexts/productContext";
import { useTheme } from "@/contexts/themeContext";
import { useRef } from "react";

interface ListTypes {
  name: string;
  type: string;
  id: number;
}

interface ListProps {
  data: { [key: string]: ListTypes | undefined };
}

export const ListingComponent = ({ data }: ListProps) => {
  const { themeMode } = useTheme();
  const { setIsActiveType } = useProductContext();
  const activeId = useRef(0);
  const selectType = (x: ListTypes) => {
    setIsActiveType(x?.type);
    activeId.current = x?.id;
  };

  return (
    <div className="flex w-full justify-start pt-5 gap-6">
      {Object.entries(data).map(([key, x]) => {
        if (!x) return;
        return (
          <div
            key={key}
            className={`flex text-[10px] ${
              x?.id === activeId?.current && themeMode === "light"
                ? "bg-[#F38219] text-white transform scale-105"
                : x?.id !== activeId?.current && themeMode === "light"
                ? "bg-white text-black transition-all ease-in-out duration-300"
                : x?.id === activeId?.current && themeMode === "dark"
                ? "bg-[#4D4D4D] text-[#D9D9D9] transform scale-105"
                : "bg-[#6D6D6D] text-[#D9D9D9] transition-all ease-in-out duration-300"
            } rounded-full items-center justify-center p-[7px]`}
            onClick={() => selectType(x)}
          >
            <div className="flex gap-2">{x?.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListingComponent;
