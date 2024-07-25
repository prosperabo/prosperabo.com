"use client";
import React, { useState } from "react";

type optionStructure = {
  label: string;
  value: string;
};
interface SeleccionProps {
  title: string;
  options: optionStructure[];
  onSelected: (option: string) => void;
}

const Selection: React.FC<SeleccionProps> = ({
  title,
  options,
  onSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option: optionStructure) => {
    setSelectedOption(option.value);
    onSelected(option.value);
  };

  return (
    <div className="">
      <label className="text-2xl font-semibold text-white" htmlFor="attribute">
        {title}
      </label>
      <div className="mt-8 grid w-full grid-cols-1 md:grid-cols-2 justify-center gap-4 lg:grid-cols-4">
        {options.map((option) => (
          <button
            key={option.value}
            className={`col-span-1 rounded-2xl border-4 border-solid px-2 py-1 text-lg font-semibold transition-colors duration-300 ${
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

export default Selection;
