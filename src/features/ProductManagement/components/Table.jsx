import React from 'react';

// Format currency 
const formatCurrency = (amount) => {
    const safeAmount = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(safeAmount);
};

// Get status badge HTML 
const StatusBadge = ({ status, stock }) => {
    let className = 'status-badge ';
    let dotColor = 'w-2 h-2 rounded-full ';
    let text = '';

    const safeStock = Number(stock) || 0;

    if (safeStock === 0) {
        className += 'status-out-of-stock';
        dotColor += 'bg-red-500';
        text = 'Hết hàng';
    } else if (safeStock <= 10) {
        className += 'status-low-stock';
        dotColor += 'bg-yellow-500';
        text = 'Sắp hết';
    } else if (status === true || status === 'active') {
        className += 'status-active';
        dotColor += 'bg-green-500';
        text = 'Đang bán';
    } else {
        className += 'status-inactive';
        dotColor += 'bg-gray-500';
        text = 'Dừng bán';
    }

    return (
        <span className={className}>
            <div className={dotColor}></div>
            {text}
        </span>
    );
};

const Table = ({ 
    products, totalItems, currentPage, itemsPerPage, totalPages,
    onPageChange, onItemsPerPageChange, selectedProductIds,
    isAllSelected, isIndeterminate, onSelectProduct, onSelectAll,
    onBulkDelete, onBulkEdit, toggleDropdown, dropdownOpenId,
    loading, error,
    onViewDetail
}) => {
    
    const safeTotalItems = Number(totalItems) || 0;
    const safeCurrentPage = Number(currentPage) || 1;
    const safeItemsPerPage = Number(itemsPerPage) || 20;
    const safeTotalPages = Number(totalPages) || 1;

    const isBulkActionDisabled = selectedProductIds.size === 0;
    const startItem = (safeCurrentPage - 1) * safeItemsPerPage + 1;
    const endItem = Math.min(safeCurrentPage * safeItemsPerPage, safeTotalItems);

    const displayStartItem = safeTotalItems === 0 ? 0 : startItem;
    const displayEndItem = safeTotalItems === 0 ? 0 : endItem;

    React.useEffect(() => {
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);

    const renderPageNumberButtons = () => {
        // Chỉ hiện thị các nút khi totalPages > 1
        if (safeTotalPages <= 1) return null;
        
        const buttons = [];
        for (let i = 1; i <= safeTotalPages; i++) {
            buttons.push(
                <button 
                    key={i}
                    className={`pagination-btn ${safeCurrentPage === i ? 'active' : ''}`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    }

    if (loading) {
        return <div className="p-6 flex-1 text-center text-blue-600">Đang tải dữ liệu sản phẩm...</div>;
    }
    if (error) {
        return <div className="p-6 flex-1 text-center text-red-600">Lỗi tải dữ liệu: {error}</div>;
    }

    // Xử lý trường hợp không có sản phẩm sau khi lọc
    const productList = products || [];
    if (productList.length === 0 && safeTotalItems === 0) {
        return (
            <div className="p-6 flex-1 text-center text-gray-500">
                <p>Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
                <button className="text-blue-600 mt-2 hover:underline" onClick={() => onItemsPerPageChange({ target: { value: 20 } })}>Tải lại trang</button>
            </div>
        );
    }
    
    return (
        <div className="flex-1">
            <div className="p-6">
                {/* Toolbar (Phân trang và Thao tác hàng loạt) */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600"> 
                            Hiển thị <span className="font-semibold">{startItem}-{endItem}</span> trên tổng số <span className="font-semibold">{totalItems}</span> sản phẩm 
                        </span>
                        <select 
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={itemsPerPage}
                            onChange={onItemsPerPageChange}
                        >
                            <option value="10">10/trang</option>
                            <option value="20">20/trang</option>
                            <option value="50">50/trang</option>
                            <option value="100">100/trang</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* NÚT XÓA ĐÃ CHỌN */}
                        <button 
                            className={`px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors ${isBulkActionDisabled ? 'opacity-50' : ''}`} 
                            disabled={isBulkActionDisabled}
                            onClick={onBulkDelete}
                        > 
                            Xóa đã chọn ({selectedProductIds.size})
                        </button>
                        {/* NÚT SỬA HÀNG LOẠT */}
                        <button 
                            className={`px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors ${isBulkActionDisabled ? 'opacity-50' : ''}`} 
                            disabled={isBulkActionDisabled}
                            onClick={onBulkEdit}
                        > 
                            Sửa hàng loạt
                        </button>
                    </div>
                </div>

                {/* Bảng sản phẩm */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ảnh</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên sản phẩm</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Danh mục</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Giá bán</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Tồn kho</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {productList.map(product => (
                                <tr key={product._id} className="table-row">
                                    <td className="px-4 py-4">
                                        <input 
                                            type="checkbox" 
                                            className="checkbox-custom product-checkbox" 
                                            data-id={product._id} 
                                            checked={selectedProductIds.has(product._id)}
                                            onChange={(e) => onSelectProduct(product._id, e.target.checked)}
                                        />
                                    </td>
                                    <td className="px-4 py-4"><img src={product.image} alt={product.name_product} className="w-10 h-10 rounded-lg object-cover" /></td>
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">{product.name_product}</div>
                                            <div className="text-sm text-gray-500">{product.brand}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {product.category_name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right"><span className="font-semibold text-gray-900">{formatCurrency(product.price)}</span></td>
                                    <td className="px-4 py-4 text-right"><span className={`font-semibold ${product.stock_quantity <= 10 ? 'text-red-600' : 'text-gray-900'}`}>{product.stock_quantity}</span></td>
                                    <td className="px-4 py-4"><StatusBadge status={product.status} stock={product.stock_quantity} /></td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="relative">
                                            <button className="action-menu-btn p-1 text-gray-400 hover:text-gray-600" onClick={() => toggleDropdown(product._id)}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                            </button>
                                            <div className={`dropdown-menu ${dropdownOpenId === product._id ? 'show' : ''}`}>
                                                <button 
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => onViewDetail(product._id)} 
                                                >
                                                    Xem chi tiết
                                                </button>
                                                <div className="border-t border-gray-100"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">
                        Hiển thị <span className="font-semibold">{displayStartItem}</span> đến <span className="font-semibold">{displayEndItem}</span> trên tổng số <span className="font-semibold">{safeTotalItems}</span> kết quả
                    </div>
                    <div className="flex items-center space-x-1">
                        <button 
                            className="pagination-btn" 
                            disabled={safeCurrentPage === 1}
                            onClick={() => onPageChange(safeCurrentPage - 1)}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button> 
                        
                        {renderPageNumberButtons()} 
                        
                        <button 
                            className="pagination-btn"
                            disabled={safeCurrentPage === safeTotalPages}
                            onClick={() => onPageChange(safeCurrentPage + 1)}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;