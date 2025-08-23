import React from 'react';

const CESHeader = () => {
    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                        <span className="text-4xl">✋</span>
                        <span>Phân tích điểm tương tác (CES)</span>
                    </h1>
                    <p className="text-gray-600 mt-2">Đo lường mức độ khách hàng tương tác trực tiếp với sản phẩm</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0 flex-shrink-0">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Hôm nay</option>
                        <option>7 ngày qua</option>
                        <option>30 ngày qua</option>
                        <option>Tùy chọn</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        <span>Xuất báo cáo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CESHeader;