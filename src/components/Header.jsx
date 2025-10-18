import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className=" w-full bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className=" mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow-sm">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.09 14.41L12 15.67l1.09.74c.26.18.59.08.75-.19.16-.27.06-.61-.2-.78l-1.64-1.1V9.5c0-.32-.26-.58-.58-.58s-.58.26-.58.58v4.84l-1.64 1.1c-.26.17-.36.51-.2.78.16.27.49.37.75.19z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">StoreLens</span>
          </div>

          <Navbar />
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Type to search..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1.5 right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex items-center space-x-2.5 cursor-pointer hover:opacity-75 transition-opacity">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                A
              </div>
              <span className="font-medium text-gray-700 text-sm hidden sm:block">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
