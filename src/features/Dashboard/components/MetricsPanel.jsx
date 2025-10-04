import { Clock, ShoppingCart, TrendingUp, Users } from "lucide-react";

const MetricsPanel = ({peopleEntrened}) => {
  
  console.log(peopleEntrened);
  const metrics = [
    {
      title: 'Khách vào hôm nay',
      value: peopleEntrened.peopleEntrened,
      change: '+12% so với hôm qua',
      changeValue: '+134',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Khách ra hôm nay',
      value: '1,189',
      change: '+8% so với hôm qua',
      changeValue: '+86',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Đang trong cửa hàng',
      value: '58',
      change: 'Thời gian thực',
      changeValue: '',
      trend: 'neutral',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Thời gian lưu trú TB',
      value: '24m',
      change: '+3m so với hôm qua',
      changeValue: '+12.5%',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border-2 ${metric.borderColor} hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
                {metric.trend === 'up' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">{metric.changeValue}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {metric.title}
                </div>
                <div className={`text-xs font-medium ${metric.color}`}>
                  {metric.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MetricsPanel;