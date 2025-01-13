import { SetStateAction, useState, useRef, useEffect } from 'react';

export function DropdownCheckboxDepartamento() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null)
;
  /* Only one to click  */
  const handleCheckboxChange = (option: SetStateAction<string>) =>{
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }
/* Menu droping */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /* Clicking out of the window */

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
    setIsDropdownOpen(false);
  }
}
useEffect(() =>{
  document.addEventListener("mousedown", handleClickOutside)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])

  return (
    <div>
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className="bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%]"
        type="button"
      >
     {selectedOption || "Departamento"}
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
          className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          ref={dropdownRef}
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <div className="flex items-center">
                <input
                  id="checkbox-item-1"
                  type="checkbox"
                  defaultChecked={false}
                  value=""
                  checked={selectedOption == "Departamento1"}
                  onChange={() => handleCheckboxChange("Departamento1")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Departamento1
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <input
                  defaultChecked
                  id="checkbox-item-2"
                  type="checkbox"
                  value=""
                  checked={selectedOption == "Departamento2"}
                  onChange={() => handleCheckboxChange("Departamento2")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Departamento2
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <input
                  id="checkbox-item-3"
                  type="checkbox"
                  value=""
                  checked={selectedOption == "Departamento3"}
                  onChange={() => handleCheckboxChange("Departamento3")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-3"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Departamento3
                  
                </label>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownCheckboxDepartamento;
