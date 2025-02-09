import React, { useEffect, useState } from 'react';
import { QuantityMaskProps } from '@/app/types/employee';

export const QuantityMask: React.FC<QuantityMaskProps> = ({
  value = 1, // Ensure default numeric value
  onChange,
  min = 0,
  max = Infinity,
}) => {
  const [quantity, setQuantity] = useState<number>(Number(value) || 1); // Default to 1 if value is NaN

  // Sync local state with external prop changes
  useEffect(() => {
    setQuantity(Number(value) || 1);
  }, [value]);

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = Math.min(prev + 1, max);
      onChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQuantity = Math.max(prev - 1, min);
      onChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="relative flex items-center max-w-[8rem] bg-[#D9D9D9] rounded-lg">
        {/* Decrease Button */}
        <button
          type="button"
          onClick={handleDecrease}
          className={`bg-[#D9D9D9] hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-2 focus:outline-none ${
            quantity <= min ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={quantity <= min}
        >
          <svg
            className="w-3 h-3 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 1h16" />
          </svg>
        </button>

        {/* Quantity Display */}
        <input
          type="text"
          id="quantity-input"
          value={quantity}
          readOnly
          className="bg-[#D9D9D9] border-x-0 text-center text-gray-900 text-sm w-full h-11"
        />

        {/* Increase Button */}
        <button
          type="button"
          onClick={handleIncrease}
          className={`bg-[#D9D9D9] hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-2 focus:outline-none ${
            quantity >= max ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={quantity >= max}
        >
          <svg
            className="w-3 h-3 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
