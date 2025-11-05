import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { use, useState } from 'react';
const TopProducts = ({dataProducts}) => {
  console.log("dataProducts in TopProducts", dataProducts);
  const products = [
    { rank: 1, name: 'Thực phẩm tươi sống', sales: 420, revenue: '$89k', trend: 'up', color: 'from-blue-500 to-blue-600' },
    { rank: 2, name: 'Đồ uống', sales: 380, revenue: '$76k', trend: 'up', color: 'from-purple-500 to-purple-600' },
    { rank: 3, name: 'Mỹ phẩm', sales: 280, revenue: '$52k', trend: 'down', color: 'from-pink-500 to-pink-600' },
    { rank: 4, name: 'Bánh kẹo', sales: 250, revenue: '$45k', trend: 'up', color: 'from-orange-500 to-orange-600' },
    { rank: 5, name: 'Sản phẩm sữa', sales: 220, revenue: '$38k', trend: 'up', color: 'from-green-500 to-green-600' },
  ];



  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Top 5 Sản phẩm bán chạy
        </h3>
        <p className="text-sm text-gray-500 mt-1">Theo dõi hiệu suất bán hàng</p>
      </div>
      <div className="space-y-3">
        {dataProducts.map((product) => (
          <div
            key={product.rank}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md`}>
                {product.rank}
              </div>
              <div className="flex-1">
                <div className="text-gray-900 font-semibold text-sm">
                  {product.product_name}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  {product.total_revenue} sản phẩm đã bán
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-bold text-base">
                {product.total_revenue}
              </span>
              {product.trend === 'up' ? (
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              ) : (
                <div className="p-2 bg-red-50 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;