'use client'; // TODO:
import { useEffect, useRef, useState } from "react";
import { DropdownCheckboxGenderProps } from "@/app/types/dropdown";
import { GenderEnum } from "@/app/schemas/enums/gender";

export function DropdownCheckboxGender({
  value = "",
  onChange,
  disabled = false, // Default is false
}: DropdownCheckboxGenderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDropdownOpen((prevState) => !prevState);
    }
  };

  // Close dropdown when clicking outside
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
    <div ref={dropdownRef} className="relative">
      {/* Button to toggle dropdown */}
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className={`bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="button"
        disabled={disabled} // Disable the button if `disabled` is true
      >
        {value || "Gênero"}
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
      {isDropdownOpen && !disabled && (
        <div
          id="dropdownDefaultCheckbox"
          className="z-10 w-48 bg-white divide-y divide-gray-100 absolute rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {/* Map Enum for Options */}
            {Object.entries(GenderEnum).map(([key, value]) => (
  <li key={key}>
    <div className="flex items-center">
      <input
        id={`checkbox-item-${key}`}
        type="radio" // Use radio for exclusive selection
        value={value}
        checked={value === value} // Controlled by parent
        onChange={() => onChange(value)} // Update parent state
        disabled={disabled} // Disable input if `disabled` is true
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        htmlFor={`checkbox-item-${key}`}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {value}
      </label>
    </div>
  </li>
))}

          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownCheckboxGender;
