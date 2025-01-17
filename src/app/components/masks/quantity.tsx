import React, { useState, useEffect } from 'react';
import { QuantityMaskProps } from '@/app/types/employee';

export const QuantityMask: React.FC<QuantityMaskProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
}) => {
  const [quantity, setQuantity] = useState(value);

  // Atualiza o estado local sempre que a prop `value` mudar
  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleIncrease = () => {
    const newQuantity = Math.min(quantity + 1, max); // Garante que não ultrapasse o valor máximo
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, min); // Garante que não fique abaixo do valor mínimo
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="relative flex items-center max-w-[8rem] bg-[#D9D9D9] rounded-lg">
        {/* Botão de diminuir */}
        <button
          type="button"
          onClick={handleDecrease}
          className={`bg-[#D9D9D9] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
            quantity <= min ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={quantity <= min} // Desabilita o botão se atingir o mínimo
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>

        {/* Campo de quantidade */}
        <input
          type="text"
          id="quantity-input"
          value={quantity}
          readOnly
          className="bg-[#D9D9D9] border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0"
          required
        />

        {/* Botão de aumentar */}
        <button
          type="button"
          onClick={handleIncrease}
          className={`bg-[#D9D9D9] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
            quantity >= max ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={quantity >= max} // Desabilita o botão se atingir o máximo
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
