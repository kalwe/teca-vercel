import React, { useState } from 'react';

export function PhoneMask() {
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        // Remove qualquer coisa que não seja número
        value = value.replace(/\D/g, '');

        // Aplica a máscara
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
        }

        setPhone(value);
    };

    return (
        <div className="flex items-center">
            <button
                id="dropdown-phone-button"
                data-dropdown-toggle="dropdown-phone"
                className="flex-shrink-0  inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-[#D9D9D9] border border-gray-300 rounded-l-lg h-[42px]"
                type="button"
            >
                +55
            </button>
            <div
                id="dropdown-phone"
                className=" hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
            >
                <ul
                    className="py-2 text-sm text-black dark:text-gray-200"
                    aria-labelledby="dropdown-phone-button"
                >
                    <li>
                        <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                        >
                            <div className="inline-flex items-center">
                                <svg
                                    className="w-4 h-4 me-2"
                                    fill="none"
                                    viewBox="0 0 20 15"
                                >
                                    <rect
                                        width="19.6"
                                        height="14"
                                        y=".5"
                                        fill="#fff"
                                        rx="2"
                                    />
                                    <mask
                                        id="a"
                                        style={{ maskType: 'luminance' }}
                                        width="20"
                                        height="15"
                                        x="0"
                                        y="0"
                                        maskUnits="userSpaceOnUse"
                                    >
                                        <rect
                                            width="19.6"
                                            height="14"
                                            y=".5"
                                            fill="#fff"
                                            rx="2"
                                        />
                                    </mask>
                                    <g mask="url(#a)">
                                        <path
                                            fill="#262626"
                                            fillRule="evenodd"
                                            d="M0 5.167h19.6V.5H0v4.667z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fill="#F01515"
                                            fillRule="evenodd"
                                            d="M0 9.833h19.6V5.167H0v4.666z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fill="#FFD521"
                                            fillRule="evenodd"
                                            d="M0 14.5h19.6V9.833H0V14.5z"
                                            clipRule="evenodd"
                                        />
                                    </g>
                                </svg>
                                Brasil (+55)
                            </div>
                        </button>
                    </li>
                </ul>
            </div>

            <div className="relative w-full">
                <input
                    type="tel"
                    id="phone-input"
                    className="block p-2.5 w-full  text-sm text-black bg-[#D9D9D9] border border-gray-300 rounded-r-lg h-[42px] focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
                    value={phone}
                    onInput={handlePhoneChange}
                    placeholder="(DDD) 9 9999 9999"
                    style={{ color: "#262626" }}
                    required
                />
            </div>
        </div>
    );
}
