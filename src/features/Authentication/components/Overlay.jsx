import React from 'react';

const Overlay = ({ onSignInClick, onSignUpClick }) => {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1 className="font-bold text-3xl mb-4">Welcome StoreLens!</h1>
                    <p className="text-lg leading-snug px-8 mb-6">To keep connected with us please login with your personal info</p>
                    <button
                        className="ghost rounded-full bg-transparent border border-white text-sm font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-75 ease-in hover:scale-[1.02] focus:outline-none"
                        onClick={onSignInClick}
                    >
                        Sign In
                    </button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1 className="font-bold text-3xl mb-4">Hello, StoreLens!</h1>
                    <p className="text-lg leading-snug px-8 mb-6">Enter your details and start your journey with us</p>
                    <button
                        className="ghost rounded-full bg-transparent border border-white text-sm font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-75 ease-in hover:scale-[1.02] focus:outline-none"
                        onClick={onSignUpClick}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
