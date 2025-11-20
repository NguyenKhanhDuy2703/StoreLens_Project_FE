import { Eye, EyeOff, Lock, User, Mail, UserPlus, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fecthSignup } from "../authenSlice";
import { fetchAllStores } from "../storesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    account: "",
    email: "",
    password: "",
    store_id: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    if (!formData.fullname) newErrors.fullname = "Họ và tên không được để trống";
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
      await dispatch(fecthSignup(formData)).unwrap();
      toast.success("Đăng ký thành công!", { autoClose: 1500 });
      setTimeout(() => navigate("/auth/signin"), 1500);
    } catch (err) {
      toast.error(err.message || "Đăng ký thất bại, thử lại!", { autoClose: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-md mx-auto">
      <ToastContainer />

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-3 shadow-lg">
          <UserPlus className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Tạo tài khoản</h2>
        <p className="text-sm text-gray-500">Đăng ký để bắt đầu sử dụng</p>
      </div>

      <div className="space-y-4">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <div className="relative">
            <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullname"
              placeholder="Nhập họ và tên"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.fullname
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
        </div>

        {/* Tài khoản */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tài khoản
          </label>
          <div className="relative">
            <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="account"
              placeholder="Nhập tài khoản"
              value={formData.account}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.account
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-1 rounded-lg hover:bg-indigo-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Cửa hàng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn cửa hàng
          </label>
          <div className="relative">
            <Home size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              name="store_id"
              value={formData.store_id}
              onChange={handleChange}
              disabled={isStoresLoading}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all ${
                errors.store_id
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            >
              <option value="">-- Chọn cửa hàng --</option>
              {stores?.map((store) => (
                <option key={store.store_id} value={store.store_id}>
                  {store.store_name}
                </option>
              ))}
            </select>
          </div>
          {errors.store_id && <p className="text-red-500 text-sm mt-1">{errors.store_id}</p>}
        </div>

        {/* Nút đăng ký */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang tạo tài khoản...</span>
            </>
          ) : (
            "ĐĂNG KÝ"
          )}
        </button>
      </div>

      {/* Link đăng nhập */}
      <div className="mt-6 text-center lg:hidden">
        <p className="text-gray-600 mb-3">Đã có tài khoản?</p>
        <button
          type="button"
          onClick={() => navigate("/auth/signin")}
          className="inline-block px-8 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          ĐĂNG NHẬP
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
