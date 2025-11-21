import React from 'react';

const formatCurrency = (amount) => {
    const safeAmount = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(safeAmount);
};

const ProductDetailModal = ({ isOpen, onClose, detail, loading }) => {
    if (!isOpen) return null;

    // Hiển thị trạng thái tải hoặc lỗi
    if (loading || !detail) {
        let content = "Đang tải chi tiết sản phẩm...";
        if (detail && detail.error) {
            content = `Lỗi: ${detail.error}`;
        } else if (detail === null) {
            content = "Không tìm thấy dữ liệu chi tiết.";
        }
        
        return (
            <ModalWrapper onClose={onClose}>
                <div className="p-8 text-center text-gray-600">
                    {content}
                </div>
            </ModalWrapper>
        );
    }
    
    // Dữ liệu sản phẩm đã có (Sử dụng tên thuộc tính BE)
    const product = detail; 

    return (
        <ModalWrapper onClose={onClose} title={`Chi tiết: ${product.name_product}`}>
            
            <div className="p-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    
            
                    <DetailItem label="Tên sản phẩm" value={product.name_product} />
                    <DetailItem label="Mã SKU (ID)" value={product._id} />
                    
                    <DetailItem label="Danh mục" value={product.category_name} />
                    <DetailItem label="Thương hiệu" value={product.brand} />
                    
                    <DetailItem label="Giá bán" value={formatCurrency(product.price)} />
                    <DetailItem label="Đơn vị" value={product.unit || '—'} />
                    
                    <DetailItem label="Tồn kho" value={product.stock_quantity} highlight={product.stock_quantity <= 10} />
                    <DetailItem label="Trạng thái" value={product.status ? "Đang bán" : "Dừng bán"} />
                    
                    <DetailItem label="Ngày tạo" value={product.created_at ? new Date(product.created_at).toLocaleString() : '—'} />
                    <DetailItem label="Cập nhật gần nhất" value={product.updated_at ? new Date(product.updated_at).toLocaleString() : '—'} />
                    
                    {/* Ảnh sản phẩm (Nếu có) */}
                    <div className="col-span-2 mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Hình ảnh</h4>
                        <img src={product.image || 'https://via.placeholder.com/100'} alt={product.name_product} className="w-24 h-24 rounded object-cover border" />
                    </div>
                </div>
            </div>

        </ModalWrapper>
    );
};

// --- Sub-components (Phần này cần đặt bên trong hoặc bên ngoài file) ---

const ModalWrapper = ({ children, onClose, title = "Chi tiết sản phẩm" }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    &times;
                </button>
            </div>
            {children}
        </div>
    </div>
);

const DetailItem = ({ label, value, highlight = false }) => (
    <div className="flex flex-col">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className={`font-semibold ${highlight ? 'text-red-600' : 'text-gray-900'}`}>{value}</span>
    </div>
);

export default ProductDetailModal;