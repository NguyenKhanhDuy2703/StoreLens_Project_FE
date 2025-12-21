import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import currency from 'currency.js';
import EmptyState from '../../../components/common/EmptyState';
import { formatCurrency } from '../../../utils/formatCurrency';

const TopProducts = ({ dataProducts }) => {
  const isEmpty = !dataProducts?.products || dataProducts?.products.length === 0;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Top 5 Sản phẩm bán chạy
        </h3>
        <p className="text-sm text-gray-500 mt-1">Theo dõi hiệu suất bán hàng</p>
      </div>

      {isEmpty ? (
       <EmptyState title='Chưa có sản phẩm bán chạy' description='Hệ thống chưa ghi nhận sản phẩm nào đủ điều kiện để xếp hạng.' />
      ) : (
        <div className="space-y-3">
          {dataProducts.products.map((product) => (
            <div
              key={product.rank}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex-1">
                <div className="text-gray-900 font-semibold text-sm">
                  {product.product_name}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  {product.total_quantity} sản phẩm đã bán
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-bold text-base">
                  {formatCurrency(product.total_revenue)}
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
      )}
    </div>
  );
};

export default TopProducts;
