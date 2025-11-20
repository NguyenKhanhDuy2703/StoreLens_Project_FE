import { Eye, EyeOff, Lock, User, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({ 
    account: "", 
    password: "", 
    email: "", 
    name: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.account) {
      newErrors.account = 'Account is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    dispatch(registerUser(formData))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-3 shadow-lg">
          <UserPlus className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
        <p className="text-sm text-gray-500">Sign up to get started</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.name 
                  ? "border-red-400 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1.5 ml-1 flex items-center gap-1">
              <span className="text-xs">⚠</span> {errors.name}
            </p>
          )}
        </div>

        {/* Account Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              name="account"
              placeholder="Enter your account"
              value={formData.account}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.account 
                  ? "border-red-400 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.account && (
            <p className="text-red-500 text-sm mt-1.5 ml-1 flex items-center gap-1">
              <span className="text-xs">⚠</span> {errors.account}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.email 
                  ? "border-red-400 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1.5 ml-1 flex items-center gap-1">
              <span className="text-xs">⚠</span> {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-11 pr-12 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.password 
                  ? "border-red-400 focus:border-red-500" 
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-1 rounded-lg hover:bg-indigo-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1.5 ml-1 flex items-center gap-1">
              <span className="text-xs">⚠</span> {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </>
          ) : (
            "SIGN UP"
          )}
        </button>
      </div>

      {/* Sign In Link - Mobile Only */}
      <div className="mt-6 text-center lg:hidden">
        <p className="text-gray-600 mb-3">Already have an account?</p>
        <button 
          type="button"
          onClick={() => navigate('/signin')}
          className="inline-block px-8 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;