import React from 'react';

const productData = [
    { rank: 1, name: "Nước ngọt Coca Cola", location: "Kệ đồ uống - Tầng 1", views: "1,842 lượt nhìn", avgTime: "7.1s", purchaseRate: "32%", color: "bg-purple-100", textColor: "text-purple-600", badgeColor: "bg-purple-600" },
    { rank: 2, name: "Kem dưỡng da Olay", location: "Kệ mỹ phẩm - Tầng 2", views: "1,652 lượt nhìn", avgTime: "8.2s", purchaseRate: "29%", color: "bg-green-100", textColor: "text-green-600", badgeColor: "bg-green-600" },
    { rank: 3, name: "Bánh quy Oreo", location: "Kệ bánh kẹo - Tầng 1", views: "1,230 lượt nhìn", avgTime: "6.5s", purchaseRate: "24%", color: "bg-orange-100", textColor: "text-orange-600", badgeColor: "bg-orange-600" },
    { rank: 4, name: "Dầu gội Head & Shoulders", location: "Kệ chăm sóc cá nhân - Tầng 1", views: "980 lượt nhìn", avgTime: "5.9s", purchaseRate: "26%", color: "bg-blue-100", textColor: "text-blue-600", badgeColor: "bg-blue-600" },
    { rank: 5, name: "Kẹo Mentos", location: "Quầy thanh toán", views: "820 lượt nhìn", avgTime: "4.8s", purchaseRate: "19%", color: "bg-teal-100", textColor: "text-teal-600", badgeColor: "bg-teal-600" },
];

const ProductCard = ({ product }) => (
    <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 ${product.badgeColor} rounded-md flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-bold text-sm">{product.rank}</span>
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 truncate">{product.name}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{product.views}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>TB: {product.avgTime}</span>
            </div>
        </div>
        <div className="text-right pl-4">
             <p className={`font-bold ${product.textColor}`}>{product.purchaseRate}</p>
             <p className="text-xs text-gray-500">Tỷ lệ mua</p>
        </div>
    </div>
);


const TopProductsPanel = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm  p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    Top sản phẩm được nhìn nhiều nhất
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem tất cả</button>
            </div>
            <div className="space-y-5">
                {productData.map(product => <ProductCard key={product.rank} product={product} />)}
            </div>
        </div>
    );
};

export default TopProductsPanel;