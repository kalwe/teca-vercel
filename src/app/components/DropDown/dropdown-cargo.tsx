'use client';
import React, { useState, useEffect, useRef } from "react";
import { DropdownCheckboxProps } from "@/app/types/employee";


const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  value = "",
  onChange,
  disabled = false,
  options = ["Cargo1", "Cargo2", "Cargo3", "Cargo4"], // Default options
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(value); // State to store selected option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Sync selected option with the provided value
    setSelectedOption(value);
  }, [value]);

  const handleCheckboxChange = (option: string) => {
    const newOption = option === selectedOption ? "" : option; // Toggle selection
    setSelectedOption(newOption); // Update the local state
    onChange(newOption); // Notify the parent component about the change
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown state
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Button to toggle the dropdown */}
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        disabled={disabled}
        aria-disabled={disabled}
        className={`bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-[100%] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="button"
      >
        {selectedOption || "Cargo"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownDefaultCheckbox"
          className="z-10 w-48 bg-white divide-y divide-gray-100 absolute rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          ref={dropdownRef}
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li key={option}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${option}`}
                    type="checkbox"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleCheckboxChange(option)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`checkbox-item-${option}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
