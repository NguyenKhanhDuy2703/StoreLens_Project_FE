import { Outlet } from "react-router-dom";

const AuthenticationLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
            <Outlet />
            </div>
          </div>

          {/* Welcome Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 items-center justify-center p-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .5) 25%, rgba(255, 255, 255, .5) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, .5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .5) 25%, rgba(255, 255, 255, .5) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, .5) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}></div>
            
            <div className="text-center text-white relative z-10">
              <div className="mb-8">
                <div className="inline-block p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm mb-4">
                 <img src="/src/assets/logo.png" alt="StoreLens Logo" className="w-48 h-48" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 tracking-tight">
                Hello, StoreLens!
              </h1>
              <p className="text-xl text-white text-opacity-90 font-light">
                Computer Vision Analytics Platform
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white text-opacity-75">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI-Powered Retail Intelligence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthenticationLayout;