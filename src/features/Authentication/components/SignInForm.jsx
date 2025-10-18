import React, { useState } from 'react';
import PasswordField from './PasswordField';

const SignInForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="form-container sign-in-container">
      <form
        onSubmit={handleSubmit}
        className="bg-white h-full flex justify-center items-center flex-col px-12 text-center"
      >
        <h1 className="font-bold text-3xl mb-4">Sign In</h1>
        <span className="text-sm text-gray-600 mb-4">Use your account</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 border-none rounded-lg py-3 px-4 my-2 w-full focus:outline-none"
        />
        <PasswordField
          placeholder="Password"
          value={password} // <-- Giờ biến này đã tồn tại
          onChange={(e) => setPassword(e.target.value)} // <-- Giờ hàm này đã tồn tại
        />
        <a href="#" className="text-sm text-gray-600 hover:underline mb-4">
          Forgot your password?
        </a>
        <button
          type="submit"
          className="rounded-full bg-indigo-600 text-white text-sm font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-75 ease-in hover:scale-[1.02] focus:outline-none"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;