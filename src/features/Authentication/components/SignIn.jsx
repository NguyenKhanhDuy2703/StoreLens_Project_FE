import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fecthLogin } from "../authenSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = () => {
  const [formData, setFormData] = useState({ account: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xử lý nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Kiểm tra dữ liệu
  const validateForm = () => {
    const newErrors = {};
    if (!formData.account) newErrors.account = "Tài khoản không được để trống";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
    else if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    return newErrors;
  };

  // Submit
  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(
        fecthLogin({
          account: formData.account,
          password: formData.password,
        })
      ).unwrap();

      toast.success("Đăng nhập thành công!", { autoClose: 1500 });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error || "Đăng nhập thất bại! Vui lòng thử lại.", { autoClose: 2000 });
    }

    setIsLoading(false);
  };

  return (
    <div className="animate-fadeIn">
      {/* Toast Container */}
      <ToastContainer position="top-right" />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-3 shadow-lg">
          <Lock className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Chào mừng bạn trở lại
        </h2>
        <p className="text-sm text-gray-500">
          Đăng nhập để tiếp tục với tài khoản của bạn
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Account Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tài khoản
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              name="account"
              placeholder="Nhập tài khoản"
              value={formData.account}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl ${
                errors.account ? "border-red-400" : "border-gray-200"
              } focus:outline-none focus:bg-white focus:border-indigo-500`}
            />
          </div>
          {errors.account && (
            <p className="text-red-500 text-sm mt-1.5 ml-1">⚠ {errors.account}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-11 pr-12 py-3 bg-gray-50 border-2 rounded-xl ${
                errors.password ? "border-red-400" : "border-gray-200"
              } focus:outline-none focus:bg-white focus:border-indigo-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1.5 ml-1">⚠ {errors.password}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button className="text-sm text-indigo-600 hover:underline font-medium">
            Quên mật khẩu?
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
