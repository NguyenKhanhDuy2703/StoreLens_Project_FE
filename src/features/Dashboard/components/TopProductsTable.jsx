import { TrendingUp } from "lucide-react";

// Top Products Table Component
const TopProductsTable = () => {
  const products = [
    { rank: 1, zone: 'Thực phẩm tươi', visits: 420, conversion: '22%', trend: 'up' },
    { rank: 2, zone: 'Đồ uống có ga', visits: 380, conversion: '19%', trend: 'up' },
    { rank: 3, zone: 'Mỹ phẩm', visits: 280, conversion: '15%', trend: 'down' },
    { rank: 4, zone: 'Snack', visits: 250, conversion: '18%', trend: 'up' },
    { rank: 5, zone: 'Sữa & Sản phẩm sữa', visits: 220, conversion: '16%', trend: 'up' }
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Khu vực hot nhất</h2>
        <select className="rounded border border-gray-300 px-2 py-1 text-sm">
          <option>Hôm nay</option>
          <option>Tuần này</option>
          <option>Tháng này</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-600">
              <th className="pb-3 font-medium">Hạng</th>
              <th className="pb-3 font-medium">Khu vực</th>
              <th className="pb-3 font-medium">Lượt ghé</th>
              <th className="pb-3 font-medium">Tỷ lệ mua</th>
              <th className="pb-3 font-medium">Xu hướng</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.rank} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {product.rank}
                  </span>
                </td>
                <td className="py-3 font-medium text-gray-900">{product.zone}</td>
                <td className="py-3 text-gray-600">{product.visits}</td>
                <td className="py-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    {product.conversion}
                  </span>
                </td>
                <td className="py-3">
                  {product.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 rotate-180 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TopProductsTable;