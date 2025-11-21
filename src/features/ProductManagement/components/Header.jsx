import React from 'react';

const Header = ({ onAddProduct }) => {
    const gradientBgClass = "bg-blue-500 hover:bg-blue-600 transition-colors"; 

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
                        <p className="text-gray-600 mt-1">Quản lý toàn bộ sản phẩm trong hệ thống</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            onClick={() => alert('Nhập dữ liệu...')}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg> 
                            Nhập Dữ liệu
                        </button>
                        <button 
                            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            onClick={() => alert('Xuất dữ liệu...')}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> 
                            Xuất Dữ liệu
                        </button>
                        <button 
                            className={`flex items-center px-6 py-2 ${gradientBgClass} text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold`}
                            onClick={onAddProduct}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> 
                            Thêm Sản phẩm mới
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;