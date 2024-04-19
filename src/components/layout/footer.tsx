import { useTheme } from "@/contexts/themeContext";
import SwipeableComponent from "../swipe/swipe";

export const Footer = () => {

  const { themeMode } = useTheme();

  return (
    <div className={`flex w-full items-center justify-center pt-24 ${themeMode === 'dark' ? 'bg-[#2D2D2D] text-[#FCFCFF]' : ''}`}>
      <SwipeableComponent />
    </div>
  );
};

export default Footer;
