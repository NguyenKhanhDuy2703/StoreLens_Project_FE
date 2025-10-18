import React, { useState } from 'react';

const PasswordField = ({ placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const eyeOpenIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.458 12C2.732 7.943 7.09 5 12 5s9.268 2.943 10.542 7C21.268 16.057 16.91 19 12 19S2.732 16.057 1.458 12z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    const eyeClosedIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18M10.58 10.59A3 3 0 0113.42 13.4M9.88 9.88C8.2 10.5 6.7 11.54 5.52 13c1.52 1.94 3.93 4 6.48 4 1.26 0 2.46-.39 3.5-1.06M12 5c3.06 0 5.79 1.94 7.48 4-.57.73-1.21 1.4-1.9 1.99" />
        </svg>
    );

    return (
        <div className="relative w-full my-2">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="bg-gray-100 border-none rounded-lg py-3 px-4 w-full focus:outline-none"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                aria-label="Toggle password visibility"
            >
                <div className="w-6 h-6">
                    {showPassword ? eyeOpenIcon : eyeClosedIcon}
                </div>
            </button>
        </div>
    );
};

export default PasswordField;
