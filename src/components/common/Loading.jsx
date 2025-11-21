const LoadingOverlay = ({ isLoading, message = 'Loading...', blur = true }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 ${blur ? 'backdrop-blur-sm' : ''} transition-opacity`}
      />
      
      {/* Loading Content */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
        {/* Spinner */}
        <div className="relative">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-purple-200 rounded-full animate-ping opacity-20" />
        </div>
        
        {/* Message */}
        <div className="text-center">
          <p className="text-gray-900 font-semibold text-lg">{message}</p>
          <p className="text-gray-500 text-sm mt-1">Please wait...</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
export default LoadingOverlay;