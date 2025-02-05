"use client";
import React, { useState, useEffect, useRef } from "react";
import { PositionService } from "@/app/services/dropdownService";

const DropdownCheckbox = ({ value = "", onChange }: { value: string; onChange: (val: string) => void }) => {
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [positions, setPositions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch job positions from API
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const data = await PositionService.getAllPositions();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setPositions(data);
      } catch (err) {
        setError("Failed to load positions.");
        console.error("Error fetching positions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleCheckboxChange = (option: string) => {
    setSelectedOption(option === selectedOption ? "" : option);
    onChange(option === selectedOption ? "" : option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-full flex justify-between items-center text-left"
      >
        <span>{selectedOption || "Escolha um cargo"}</span>
        {/* Dropdown arrow */}
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

      {isDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-md" ref={dropdownRef}>
          {loading && <p className="text-center p-2">Loading...</p>}
          {error && <p className="text-center p-2 text-red-500">{error}</p>}

          {!loading && !error && (
            <ul className="p-2">
              {positions.length > 0 ? (
                positions.map((position) => (
                  <li
                    key={position.id}
                    className={`p-2 cursor-pointer ${selectedOption === position.name ? "bg-gray-300" : "hover:bg-gray-200"}`}
                    onClick={() => handleCheckboxChange(position.name)}
                  >
                    {position.name}
                  </li>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">Nenhum cargo disponível.</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
