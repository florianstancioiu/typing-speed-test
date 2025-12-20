import DownArrowSvg from "../../../images/icon-down-arrow.svg?react";

export type DropdownOption = {
  id: number;
  title: string;
  value: number | string;
  isActive: boolean;
};

export type DropdownProps = {
  options: DropdownOption[];
};

// TODO: Use the POPOVER API to generate dropdowns
const Dropdown = ({ options }: DropdownProps) => {
  const activeOption = options.find((option) => option.isActive) ?? options[0];

  return (
    <div className="w-full">
      <p className="w-full border border-neutral-500 rounded-lg p-1.5 text-center text-white flex justify-center items-center cursor-pointer">
        <span className="inline-block mr-2.5">{activeOption.title}</span>
        <DownArrowSvg />
      </p>
      <ul className="list-none hidden">
        {options.map((option) => {
          return (
            <li key={option.id}>
              <div className="hidden"></div>
              <div className="">
                <span className="inline-block w-4 h-4 border border-white rounded-full"></span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
