import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./signInSlice";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({ account: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { isLoading, error, token, user } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.account) newErrors.account = 'Account is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(loginUser({ account: formData.account, password: formData.password }));
  };

  useEffect(() => {
    if (token && user) {
      // Lưu token vào localStorage
      localStorage.setItem("token", token);
      console.log("Token received by Dashboard:", token);
      console.log("User info received by Dashboard:", user);
      navigate("/");
    }
  }, [token, user, navigate]);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl font-bold mb-2">Sign In</h2>
      <p className="text-gray-600 mb-8">Use your account</p>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="account"
            placeholder="Account"
            value={formData.account}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.account ? "ring-2 ring-red-500" : "focus:ring-indigo-600"
            }`}
          />
          {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
        </div>

        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.password ? "ring-2 ring-red-500" : "focus:ring-indigo-600"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="text-center">
          <button className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
            Forgot your password?
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "SIGN IN"}
        </button>
      </div>

      <div className="mt-6 text-center lg:hidden">
        <p className="text-gray-600 mb-4">Don't have an account?</p>
        <button className="inline-block px-8 py-2 border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
