import React from 'react';

// Dữ liệu mẫu
const productData = [
    { rank: 1, name: "Kem dưỡng da Olay", location: "Kệ mỹ phẩm - Tầng 2", touches: 342, ces: 85.2, purchaseRate: "28%", gradient: "from-blue-500 to-purple-600" },
    { rank: 2, name: "Nước ngọt Coca Cola", location: "Kệ đồ uống - Tầng 1", touches: 298, ces: 82.1, purchaseRate: "35%", gradient: "from-green-500 to-teal-600" },
    { rank: 3, name: "Bánh quy Oreo", location: "Kệ bánh kẹo - Tầng 1", touches: 267, ces: 79.8, purchaseRate: "22%", gradient: "from-orange-500 to-red-600" },
    { rank: 4, name: "Dầu gội Head & Shoulders", location: "Kệ chăm sóc cá nhân - Tầng 2", touches: 234, ces: 76.5, purchaseRate: "31%", gradient: "from-purple-500 to-pink-600" },
    { rank: 5, name: "Kẹo Mentos", location: "Quầy thanh toán", touches: 189, ces: 73.2, purchaseRate: "18%", gradient: "from-indigo-500 to-blue-600" },
];

// Component con cho mỗi thẻ sản phẩm
const ProductCard = ({ product }) => (
    <div className="product-card p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold">{product.rank}</span>
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.location}</p>
                <div className="flex items-center flex-wrap gap-2 mt-2">
                    <span className="interaction-badge px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        👆 {product.touches} lần chạm
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        CES: {product.ces}
                    </span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-green-600">{product.purchaseRate}</p>
                <p className="text-xs text-gray-500">Tỷ lệ mua</p>
            </div>
        </div>
    </div>
);

const TopProductsPanel = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span className="text-2xl">🏆</span>
                    <span>Sản phẩm tương tác nhiều nhất</span>
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem tất cả</button>
            </div>
            <div className="space-y-4">
                {productData.map(product => <ProductCard key={product.rank} product={product} />)}
            </div>
        </div>
    );
};

export default TopProductsPanel;