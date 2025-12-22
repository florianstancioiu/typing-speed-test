import { cn } from "tailwind-cn";
import { useState } from "react";
import DownArrowSvg from "../../../images/icon-down-arrow.svg?react";

export type DropdownOption = {
  id: number;
  title: string;
  value: number | string;
  isActive: boolean;
};

export type DropdownToButtonsProps = {
  options: DropdownOption[];
  title: string;
  className?: string;
  onOptionClick: (option: DropdownOption) => void;
};

const DropdownToButtons = ({
  options,
  title,
  className,
  onOptionClick,
}: DropdownToButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption = options.find((option) => option.isActive) ?? options[0];
  let tabletClasses = "hidden md:inline-flex md:items-center";
  tabletClasses = cn(
    tabletClasses,
    typeof className !== "undefined" ? className : ""
  );

  const onToggleBtnClickHandler = () => {
    setIsOpen((previousValue) => !previousValue);
  };

  const onClickHandler = (option: DropdownOption) => {
    setIsOpen(false);
    onOptionClick(option);
  };

  return (
    <>
      <div className={tabletClasses}>
        <p className="mr-3.5 text-base">{title}:</p>
        <ul className="list-none flex justify-between items-center gap-x-1.5">
          {options.map((option) => {
            const baseClasses =
              "text-white py-1.5 px-2.5 border border-neutral-500 rounded-lg text-base cursor-pointer select-none";
            const mergedClasses = cn(
              baseClasses,
              option.isActive ? "border-blue-400 text-blue-400" : ""
            );

            return (
              <li
                key={option.id}
                onClick={() => onClickHandler(option)}
                className={mergedClasses}
              >
                {option.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full relative md:hidden">
        <button
          onClick={onToggleBtnClickHandler}
          className="w-full border border-neutral-500 rounded-lg p-1.5 text-center text-white flex justify-center items-center cursor-pointer select-none md:hidden"
        >
          <span className="inline-block mr-2.5">{activeOption.title}</span>
          <DownArrowSvg />
        </button>
        {isOpen && (
          <ul className="list-none w-42 bg-neutral-800 rounded-lg mt-2 absolute left-0 top-10 z-10">
            {options.map((option, index) => {
              const isLastOption = index === options.length - 1;
              let className = `sm:hidden flex items-center pl-2.5 py-2 cursor-pointer select-none `;
              className += isLastOption ? "" : " border-b border-neutral-700";

              return (
                <li
                  key={option.id}
                  onClick={() => onClickHandler(option)}
                  className={className}
                >
                  {option.isActive && (
                    <span className="inline-grid w-4 h-4 border bg-blue-400 rounded-full mr-2.5 place-content-center">
                      <span className="bg-neutral-900 w-1.5 h-1.5 rounded"></span>
                    </span>
                  )}
                  {!option.isActive && (
                    <span className="inline-block w-4 h-4 border border-white rounded-full mr-2.5"></span>
                  )}
                  <span className="text-white">{option.title}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropdownToButtons;
