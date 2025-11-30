import {
  BarChart3,
  TrendingUp,
  Package,
  Search,
  AlertCircle,
  Clock,
} from "lucide-react";
const EmptyState = ({
  type = "default",
  title = "Không có dữ liệu",
  description = "Hiện tại không có thông tin để hiển thị",
  actionText,
  onAction,
  customIcon,
  size = "medium",
}) => {
  const icons = {
    chart: <BarChart3 className="w-16 h-16 text-gray-400" />,
    trend: <TrendingUp className="w-16 h-16 text-gray-400" />,
    product: <Package className="w-16 h-16 text-gray-400" />,
    search: <Search className="w-16 h-16 text-gray-400" />,
    error: <AlertCircle className="w-16 h-16 text-gray-400" />,
    loading: <Clock className="w-16 h-16 text-gray-400" />,
    default: <BarChart3 className="w-16 h-16 text-gray-400" />,
  };
  const sizeStyles = {
    small: {
      padding: "py-8 px-4",
      titleSize: "text-base",
      descSize: "text-sm",
    },
    medium: {
      padding: "py-12 px-6",
      titleSize: "text-lg",
      descSize: "text-sm",
    },
    large: {
      padding: "py-16 px-8",
      titleSize: "text-2xl",
      descSize: "text-base",
    },
  };
  const current = sizeStyles[size] || sizeStyles.medium;
  return (
    <div
      className={`flex flex-col items-center justify-center ${current.padding} bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border border-gray-200`}
    >
      <div className="mb-4 opacity-60">
        {customIcon || icons[type] || icons.default}
      </div>
      <h3
        className={`${current.titleSize} font-semibold text-gray-700 mb-2 text-center`}
      >
        {title}
      </h3>
      <p
        className={`${current.descSize} text-gray-500 text-center mb-4 max-w-xs`}
      >
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 text-sm font-medium"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;  