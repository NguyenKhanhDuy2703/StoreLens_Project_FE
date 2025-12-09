const Loading = ({ isLoading, text = "Loading..." }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {/* Icon loading */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Text loading */}
        <p className="text-white text-lg font-medium">{text}</p>
        
        {/* Dots animation */}
        <div className="flex gap-1 justify-center mt-2">
          <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;