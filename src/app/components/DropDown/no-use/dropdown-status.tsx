import { SetStateAction, useState, useRef, useEffect } from 'react';

export function DropdownStatus(){


     const [selectedOption, setSelectedOption] = useState<string>("");
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const dropdownRef = useRef<HTMLDivElement | null>(null)


     /* Menu droping */
     const toggleDropdown = () => {
         event?.preventDefault()
         setIsDropdownOpen(!isDropdownOpen);
        };

          /* Only one to click  */
        const handleCheckboxChange = (option: SetStateAction<string>) => {
           setSelectedOption(option);
           setIsDropdownOpen(false)
        }
/* Clicking out of the window */
const handleClickOutise = (e: MouseEvent) => {
  if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
    setIsDropdownOpen(false)
  }
}
useEffect(()=>{
  document.addEventListener("mousedown", handleClickOutise)
  return () => {
    document.removeEventListener("mousedown", handleClickOutise)
  }
})


        return (
            <div className="relative">
              <div className="w-full flex items-center">
                <button
                  onClick={toggleDropdown}
                  className="bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%]"
                >
                  {selectedOption || "Status do funcionário"} {/* Exibe a opção selecionada ou o texto padrão */}
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
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  id="dropdownDefaultCheckbox"
                  className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute"
                  ref={dropdownRef}
                >
                  <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOption === "Ativo"}
                          onChange={() => handleCheckboxChange("Ativo")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Ativo
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOption === "Inativo"}
                          onChange={() => handleCheckboxChange("Inativo")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Inativo
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOption === "Recesso"}
                          onChange={() => handleCheckboxChange("Recesso")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Recesso
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

          )
        }
