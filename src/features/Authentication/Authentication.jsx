// Authentication.jsx

import React, { useState } from 'react';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Overlay from './components/Overlay';
import '../../styles/AuthAnimation.css';


const Authentication = ({ onLogin }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

 
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen font-sans">
      <div
        className={`container bg-white rounded-2xl shadow-xl relative overflow-hidden w-full max-w-4xl min-h-[550px] ${
          isRightPanelActive ? 'right-panel-active' : ''
        }`}
        id="container"
      >
        <SignUpForm />
        
        
        <SignInForm onLogin={onLogin} /> 
        
        <Overlay
          onSignInClick={() => setIsRightPanelActive(false)}
          onSignUpClick={() => setIsRightPanelActive(true)}
        />
      </div>
    </div>
  );
};

export default Authentication;