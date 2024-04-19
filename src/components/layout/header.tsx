import { useTheme } from "@/contexts/themeContext";
import { BsCloudMoonFill, BsCloudSunFill } from "react-icons/bs";
import Image from "next/legacy/image";

export const Header = () => {

  const { themeMode , toggleTheme } = useTheme();

  return (
    <div className={`flex w-full items-center justify-center relative ${themeMode === 'dark' ? 'bg-[#2D2D2D]' : ''}`}>
      <div className="flex justify-center items-center absolute left-5">
      {themeMode === 'dark' ? <BsCloudMoonFill size={36} color="white" onClick={toggleTheme}/> : <BsCloudSunFill size={36} color="black" onClick={toggleTheme}/>}
      </div>
      <div className={`flex w-[390px] h-[80px] items-center justify-center  ${themeMode === 'dark' ? 'bg-[#404040] text-[#FCFCFF]' : 'bg-white'} rounded-b-[20px] shadow-xl`}>
        <Image src={`${themeMode === 'dark' ? '/darkLogo.png' : '/logo.png'}`} width={84} height={30} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
