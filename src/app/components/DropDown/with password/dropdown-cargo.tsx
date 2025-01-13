'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function DropdownCheckboxWithPassword() {
  const [selectedOption, setSelectedOption] = useState<string>(""); // State to store selected option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle checkbox change and update selected option
  const handleCheckboxChange = (option: string) => {
    setSelectedOption(option === selectedOption ? "" : option); // Toggle selection
    setIsDropdownOpen(false); // Close the dropdown after selection

    // Toggle visibility of "show-password" div
    const passwordDiv = document.getElementById("show-password");
    if (passwordDiv) {
      passwordDiv.style.display = option === "Cargo1" ? "block" : "none";
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown state
  };

  // Handle clicks outside the dropdown
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
        className="bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%]"
        type="button"
      >
        {selectedOption || "Cargo"} {/* Display selected option or default text "Cargo" */}
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
            {/* Checkbox for Cargo1 */}
            <li>
              <div className="flex items-center">
                <input
                  id="checkbox-item-1"
                  type="checkbox"
                  value="Cargo1"
                  checked={selectedOption === "Cargo1"}
                  onChange={() => handleCheckboxChange("Cargo1")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cargo1
                </label>
              </div>
            </li>
            {/* Checkbox for Cargo2 */}
            <li>
              <div className="flex items-center">
                <input
                  id="checkbox-item-2"
                  type="checkbox"
                  value="Cargo2"
                  checked={selectedOption === "Cargo2"}
                  onChange={() => handleCheckboxChange("Cargo2")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cargo2
                </label>
              </div>
            </li>
            {/* Checkbox for Cargo3 */}
            <li>
              <div className="flex items-center">
                <input
                  id="checkbox-item-3"
                  type="checkbox"
                  value="Cargo3"
                  checked={selectedOption === "Cargo3"}
                  onChange={() => handleCheckboxChange("Cargo3")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-3"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cargo3
                </label>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Password Field */}
      <div 
      id="show-password"
      className="w-full"
      style={{display:'none'}}>
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  className="w-full mt-2 bg-transparent border-none outline-none text-white placeholder-white"
                />
                <div className="border-t border-white w-full mt-1"></div>
              </div>
    </div>
  );
}

export default DropdownCheckboxWithPassword;
