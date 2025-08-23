import React from 'react';


// SVG cho logo, bạn có thể thay bằng file ảnh của mình
const LogoIcon = () => (
  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.09 14.41L12 15.67l1.09.74c.26.18.59.08.75-.19.16-.27.06-.61-.2-.78l-1.64-1.1V9.5c0-.32-.26-.58-.58-.58s-.58.26-.58.58v4.84l-1.64 1.1c-.26.17-.36.51-.2.78.16.27.49.37.75.19z"/>
  </svg>
);


const Header = () => {
  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Phần bên trái: Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-purple-600 p-1.5 rounded-lg">
              <LogoIcon />
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">StoreLens</span>
          </div>

          {/* Phần giữa: Ô tìm kiếm */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-md w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Type to search..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Phần bên phải: Thông báo & Admin */}
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer p-1">
              
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-semibold text-gray-700 hidden md:block">Admin</span>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;