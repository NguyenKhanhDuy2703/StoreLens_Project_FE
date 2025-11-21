import { Eye, EyeOff, Lock, User, Mail, UserPlus, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllStores } from "../storesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fecthSignup } from "../authen.thunk";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
    store_id: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores, isLoading: isStoresLoading } = useSelector(
    (state) => state.stores
  );

  useEffect(() => {
    dispatch(fetchAllStores());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname)
      newErrors.fullname = "Họ và tên không được để trống";
    if (!formData.account) newErrors.account = "Tài khoản không được để trống";
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    if (!formData.store_id) newErrors.store_id = "Vui lòng chọn cửa hàng";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.warning("Hãy điền đầy đủ thông tin theo yêu cầu!");
      return;
    }
    setIsLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      await dispatch(fecthSignup(signupData)).unwrap();
      toast.success("Đăng ký thành công!", { autoClose: 1500 });
      setTimeout(() => navigate("/auth/signin"), 1500);
    } catch (err) {
      toast.error(err.message || "Đăng ký thất bại, thử lại!", {
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    navigate("/auth/signin");
  };

  const renderInputField = ({
    label,
    name,
    type = "text",
    placeholder,
    icon: Icon,
    showToggle = false,
    showValue,
    onToggleShow,
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type={showToggle ? (showValue ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full pl-10 ${showToggle ? "pr-11" : "pr-3"} py-2.5 text-sm bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition-all ${
            errors[name]
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-indigo-500"
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
            aria-label={showValue ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showValue ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1" role="alert">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="animate-fadeIn w-full max-w-md mx-auto">
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-3 shadow-lg">
          <UserPlus className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Tạo tài khoản</h2>
        <p className="text-sm text-gray-500">Đăng ký để bắt đầu sử dụng</p>
      </div>
      <div className="space-y-4">
        {renderInputField({
          label: "Họ và tên",
          name: "fullname",
          placeholder: "Nhập họ và tên",
          icon: User,
        })}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderInputField({
            label: "Tài khoản",
            name: "account",
            placeholder: "Tài khoản",
            icon: User,
          })}
          {renderInputField({
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Email",
            icon: Mail,
          })}
        </div>

        {/* Mật khẩu */}
        {renderInputField({
          label: "Mật khẩu",
          name: "password",
          placeholder: "Nhập mật khẩu",
          icon: Lock,
          showToggle: true,
          showValue: showPassword,
          onToggleShow: () => setShowPassword(!showPassword),
        })}

        {/* Xác nhận mật khẩu */}
        {renderInputField({
          label: "Xác nhận mật khẩu",
          name: "confirmPassword",
          placeholder: "Nhập lại mật khẩu",
          icon: Lock,
          showToggle: true,
          showValue: showConfirmPassword,
          onToggleShow: () => setShowConfirmPassword(!showConfirmPassword),
        })}

        {/* Cửa hàng */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Chọn cửa hàng
          </label>
          <div className="relative">
            <Home
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              name="store_id"
              value={formData.store_id}
              onChange={handleChange}
              disabled={isStoresLoading}
              className={`w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer ${
                errors.store_id
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-indigo-500"
              } ${isStoresLoading ? "opacity-50 cursor-wait" : ""}`}
            >
              <option value="">
                {isStoresLoading ? "Đang tải cửa hàng..." : "-- Chọn cửa hàng --"}
              </option>
              {stores?.map((store) => (
                <option key={store.store_id} value={store.store_id}>
                  {store.store_name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.store_id && (
            <p className="text-red-500 text-xs mt-1" role="alert">{errors.store_id}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang tạo tài khoản...</span>
            </>
          ) : (
            "ĐĂNG KÝ"
          )}
        </button>
      </div>

      {/* Sign In Link */}
      <div className="mt-6 text-center lg:hidden">
        <p className="text-gray-600 text-sm mb-3">
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={handleNavigateToSignIn}
            className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors"
          >
            Đăng nhập ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;