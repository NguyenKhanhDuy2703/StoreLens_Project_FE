
import { Home, LogIn } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blur Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-12 text-center">
            <div className="text-8xl font-black text-white animate-bounce">404</div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Trang không tìm thấy</h1>
            <p className="text-gray-600 mb-8">
              Đường dẫn bạn truy cập không tồn tại. Vui lòng quay lại trang chủ hoặc đăng nhập.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Trang chủ
              </button>

              <button
                onClick={() => window.location.href = 'auth/signin'}
                className="w-full border-2 border-cyan-500 text-cyan-600 font-bold py-3 px-6 rounded-xl hover:bg-cyan-50 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Đăng nhập
              </button>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-600"></div>
        </div>
      </div>
    </div>
  );
}
