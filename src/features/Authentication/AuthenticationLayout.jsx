import { Outlet, useLocation, useNavigate } from "react-router-dom";
import  LogoST from "../../assets/logo.png"
const AuthenticationLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUp = location.pathname.includes('signup');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 min-h-[580px]">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* Welcome Section - Desktop */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 items-center justify-center p-10 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .5) 25%, rgba(255, 255, 255, .5) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, .5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .5) 25%, rgba(255, 255, 255, .5) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, .5) 76%, transparent 77%, transparent)', 
              backgroundSize: '50px 50px'
            }}></div>
            
            <div className="text-center text-white relative z-10">
              {/* Logo */}
              <div className="mb-6">
                <div className="inline-block p-4 bg-white bg-opacity-20 rounded-3xl backdrop-blur-sm mb-4 transform transition-all duration-300 hover:scale-105 hover:bg-opacity-25">
                  <img src={LogoST} alt="StoreLens Logo" className="w-34 h-34 mx-auto" />
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl font-bold mb-3 tracking-tight">
                {isSignUp ? "Join StoreLens!" : "Hello, StoreLens!"}
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-white text-opacity-90 font-light mb-2">
                Computer Vision Analytics Platform
              </p>
              
              {/* Description */}
              <p className="text-xs text-white text-opacity-75 max-w-sm mx-auto mb-6">
                {isSignUp 
                  ? "Create your account and unlock powerful AI-driven retail insights" 
                  : "Transform your retail operations with intelligent visual analytics"}
              </p>
              
              {/* Status Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-white text-opacity-75 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI-Powered Retail Intelligence</span>
              </div>

              {/* Toggle Button */}
              <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                <p className="text-white text-opacity-80 text-sm mb-3">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </p>
                <button
                  onClick={() => navigate(isSignUp ? '/auth/signin' : '/auth/signup')}
                  className="px-10 py-2.5 bg-white text-indigo-600 font-semibold text-sm rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isSignUp ? "SIGN IN" : "SIGN UP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default AuthenticationLayout;