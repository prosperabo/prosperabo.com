"use client";
import React, { useState } from "react";
type GenderOption = {
  label: string;
  value: string;
};
interface SeleccionProps {
  onSelected: (option: string) => void;
}
const GenderSelection: React.FC<SeleccionProps> = ({ onSelected }) => {
  const options: GenderOption[] = [
    { label: "F", value: "FEMENINO" },
    { label: "M", value: "MASCULINO" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionClick = (option: GenderOption) => {
    setSelectedOption(option.value);
    console.log(option);
    onSelected(option.value);
  };

  return (
    <div className="flex w-full flex-col max-md:ml-0 max-md:w-full">
      <label
        className="text-start text-2xl font-semibold text-white"
        htmlFor="gender"
      >
        Género
      </label>
      <div className="mt-4 flex lg:justify-start justify-center gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            className={`rounded-3xl border-4 border-solid px-6 py-3 text-base font-semibold transition-colors duration-300 lg:text-2xl ${
              selectedOption === option.value
                ? "border-white bg-white text-slate-950"
                : "border-stone-300 text-white"
            } max-md:px-5`}
            onClick={(e) => {
              e.preventDefault(), handleOptionClick(option);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderSelection;
