import React, { useState } from "react";
type optionStructure = {
  id: number;
  name: string;
};
interface SelectProps {
  title: string;
  optionDefault: string;
  options: optionStructure[];
  onSelected: (option: string) => void;
  selected?: optionStructure;
}
const Select: React.FC<SelectProps> = ({
  title,
  optionDefault,
  options,
  onSelected,
  selected,
}) => {
  const [active, setActive] = useState(false);

  const [selectedOption, setSelectedOption] = useState<optionStructure>({
    id: selected?.id || 0,
    name: selected?.name || "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedId = event.target.value;
    const selectedId = parseInt(event.target.value);
    const selected = options.find((option) => option.id === selectedId) || {
      id: 0,
      name: "",
    };
    setSelectedOption(selected);
    // setSelectedOption(option.value);
    onSelected(selected.name);
  };
  return (
    <div className="flex w-full flex-col max-md:ml-0 max-md:w-full">
      <label className="text-2xl font-semibold text-white">{title}</label>

      <select
        className={` mt-6 flex justify-between gap-5 whitespace-nowrap rounded-2xl border-4 border-solid border-white bg-transparent px-7 py-2 text-white  max-md:px-5 ${
          active
            ? "border-teal-500 "
            : "border-white bg-transparent hover:text-white"
        }`}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={handleChange}
        value={selectedOption?.id?.toString() || ""}
        required
      >
        <option className="bg-black text-accent hover:bg-teal-600">
          {optionDefault}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="bg-black text-accent hover:bg-teal-600"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
