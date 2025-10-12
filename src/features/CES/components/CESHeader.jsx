import React from 'react';

const CESHeader = () => {
    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Phân tích hướng nhìn khách hàng
                    </h1>
                    <p className="text-gray-600 mt-2">Đo lường mức độ khách hàng nhìn vào sản phẩm/khu vực trong cửa hàng</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0 flex-shrink-0">
                    <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Hôm nay</option>
                        <option>7 ngày qua</option>
                        <option>30 ngày qua</option>
                        <option>Tùy chọn</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                        </svg>
                        <span>Xuất báo cáo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CESHeader;