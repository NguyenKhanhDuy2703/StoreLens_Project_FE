import React from 'react';
import PasswordField from './PasswordField';
const SignUpForm = () => {
    return (
        <div className="form-container sign-up-container">
            <form action="#" className="bg-white h-full flex justify-center items-center flex-col px-12 text-center">
                <h1 className="font-bold text-3xl mb-4">Create Account</h1>
                <span className="text-sm text-gray-600 mb-4">Use your email for registration</span>
                <input
                    type="text"
                    placeholder="Name"
                    className="bg-gray-100 border-none rounded-lg py-3 px-4 my-2 w-full focus:outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-100 border-none rounded-lg py-3 px-4 my-2 w-full focus:outline-none"
                />
                <PasswordField placeholder="Password" />
                <PasswordField placeholder="Confirm Password" />
                <button
                    type="button"
                    className="rounded-full bg-indigo-600 text-white text-sm font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-75 ease-in hover:scale-[1.02] focus:outline-none mt-4"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
