import { useTheme } from "@/contexts/themeContext";
import { MouseEventHandler, useState } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { themeMode } = useTheme();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className={`flex flex-col relative w-[250px] h-[300px] max-w-md p-6 ${
          themeMode === "dark" ? "bg-[#2D2D2D]" : "bg-white"
        } rounded shadow-lg justify-center items-center`}
      >
        <button
          className={`absolute top-0 right-0 p-2 m-2 ${themeMode === 'dark' ? 'text-white' : 'text-black'}`}
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
