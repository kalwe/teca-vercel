import React from 'react';
import { BirthDayMaskProps } from '@/app/types/employee';

export default function BirthDayMask({ value, onChange }: BirthDayMaskProps) {
    const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 2 && inputValue.length <= 4) {
            inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
        } else if (inputValue.length > 4) {
            inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2, 4) + '/' + inputValue.slice(4, 8);
        }

        onChange(inputValue);
    };

    return (
        <div className="w-full">
            <input
                type="text"
                placeholder="Data de Nascimento"
                className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                value={value}
                onChange={handleDataNascimentoChange}
                maxLength={10}
            />
            <div className="border-t border-white w-full mt-1"></div>
        </div>
    );
}
