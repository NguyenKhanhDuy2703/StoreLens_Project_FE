// ProductManagement/ProductManagement.jsx (ĐÃ CHỈNH SỬA VÀ HOÀN CHỈNH LẦN CUỐI)
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Table from './components/Table';
import AddProductModal from './components/AddProductModal';

// --- BASE DATA (Cập nhật Tên thuộc tính) ---
const baseProducts = [
    { id: 1, name: 'iPhone 14 Pro Max', category: 'Điện tử', brand: 'Apple', price: 29990000, stock: 45, status: 'active', image: 'https://via.placeholder.com/40x40/667eea/ffffff?text=IP', sku: 'IP14PM-256-BLK' }, // Bổ sung SKU
    { id: 2, name: 'Samsung Galaxy S23 Ultra', category: 'Điện tử', brand: 'Samsung', price: 26990000, stock: 32, status: 'active', image: 'https://via.placeholder.com/40x40/764ba2/ffffff?text=SG', sku: 'SGS23U-512-WHT' },
    { id: 3, name: 'Nike Air Force 1', category: 'Thời trang', brand: 'Nike', price: 2890000, stock: 8, status: 'active', image: 'https://via.placeholder.com/40x40/f093fb/ffffff?text=NK', sku: 'NAF1-42-WHT' },
    { id: 4, name: 'MacBook Pro 16"', category: 'Điện tử', brand: 'Apple', price: 59990000, stock: 0, status: 'active', image: 'https://via.placeholder.com/40x40/667eea/ffffff?text=MB', sku: 'MBP16-1TB-SLV' },
    { id: 5, name: 'Áo thun nam basic', category: 'Thời trang', brand: 'Local Brand', price: 299000, stock: 156, status: 'active', image: 'https://via.placeholder.com/40x40/4facfe/ffffff?text=AT', sku: 'ATN-L-BLK' },
    { id: 6, name: 'Nồi cơm điện Panasonic', category: 'Gia dụng', brand: 'Panasonic', price: 1590000, stock: 23, status: 'active', image: 'https://via.placeholder.com/40x40/00d4aa/ffffff?text=NC', sku: 'NCD-18L-WHT' },
    { id: 7, name: 'Sách "Đắc Nhân Tâm"', category: 'Sách', brand: 'NXB Trẻ', price: 89000, stock: 67, status: 'active', image: 'https://via.placeholder.com/40x40/ff9500/ffffff?text=SK', sku: 'DNT-2023-VN' },
    { id: 8, name: 'Tai nghe Sony WH-1000XM4', category: 'Điện tử', brand: 'Sony', price: 7990000, status: 'inactive', stock: 12, image: 'https://via.placeholder.com/40x40/764ba2/ffffff?text=TN', sku: 'SNWH1000XM4-BLK' },
    { id: 9, name: 'Tủ lạnh Toshiba Inverter 253L', category: 'Gia dụng', brand: 'Toshiba', price: 6990000, stock: 6, status: 'active', image: 'https://via.placeholder.com/40x40/43cea2/ffffff?text=TL', sku: 'TLT253L-SLV' },
    { id: 10, name: 'Giày Adidas Ultraboost 22', category: 'Thời trang', brand: 'Adidas', price: 4590000, stock: 17, status: 'active', image: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=AD', sku: 'ADUB22-42-BLK' },
    { id: 11, name: 'Bình đun siêu tốc Philips HD9350',category: 'Gia dụng', brand: 'Philips', price: 890000, stock: 30, status: 'active', image: 'https://via.placeholder.com/40x40/20bf6b/ffffff?text=BD', sku: 'PHHD9350-SLV' },
    { id: 12, name: 'Laptop Dell XPS 13', category: 'Điện tử', brand: 'Dell', price: 34990000, stock: 14, status: 'active', image: 'https://via.placeholder.com/40x40/45b7d1/ffffff?text=DE', sku: 'DXPS13-512-SLV' },
    { id: 13, name: 'Áo khoác Uniqlo Ultra Light Down', category: 'Thời trang', brand: 'Uniqlo', price: 1790000, stock: 42, status: 'active', image: 'https://via.placeholder.com/40x40/00b09b/ffffff?text=UQ', sku: 'AKU-XL-GRN' },
    { id: 14, name: 'Sách "Tuổi trẻ đáng giá bao nhiêu"', category: 'Sách', brand: 'NXB Trẻ', price: 99000, stock: 88, status: 'active', image: 'https://via.placeholder.com/40x40/f78ca0/ffffff?text=BK', sku: 'BOOK-TTDGBN-002' },
    { id: 15, name: 'Loa Bluetooth JBL Charge 5', category: 'Điện tử', brand: 'JBL', price: 3290000, stock: 25, status: 'active', image: 'https://via.placeholder.com/40x40/2980b9/ffffff?text=JB', sku: 'JBLCHG5-BLU' },
    { id: 16, name: 'Quạt điều hòa Sunhouse SHD7723', category: 'Gia dụng', brand: 'Sunhouse', price: 2990000, stock: 9, status: 'inactive', image: 'https://via.placeholder.com/40x40/fcb045/ffffff?text=QĐ', sku: 'QDH7723-WHT' },
    { id: 17, name: 'Đồng hồ Casio MTP-V002L-7B3', category: 'Phụ kiện', brand: 'Casio', price: 1190000, stock: 33, status: 'active', image: 'https://via.placeholder.com/40x40/7f7fd5/ffffff?text=CS', sku: 'CSMTPL-BRN' },
    { id: 18, name: 'Máy lọc không khí Xiaomi 4 Pro', category: 'Gia dụng', brand: 'Xiaomi', price: 4990000, stock: 11, status: 'active', image: 'https://via.placeholder.com/40x40/fb6f92/ffffff?text=XM', sku: 'XM4PRO-WHT' },
    { id: 19, name: 'Bàn phím cơ Keychron K6', category: 'Điện tử', brand: 'Keychron', price: 2190000, stock: 16, status: 'active', image: 'https://via.placeholder.com/40x40/4facfe/ffffff?text=KC', sku: 'KCK6-BLK' },
    { id: 20, name: 'Vợt cầu lông Yonex Astrox 100ZZ', category: 'Thể thao', brand: 'Yonex', price: 3690000, stock: 20, status: 'active', image: 'https://via.placeholder.com/40x40/fd79a8/ffffff?text=YX', sku: 'YX100ZZ-RED' },
];

const copies = Array(105).fill(0).map((_, i) => {
    const originalIndex = i % baseProducts.length; 
    const nextId = 29 + i; 
    return { 
        ...baseProducts[originalIndex], 
        id: nextId, 
        name: `Demo Product ${nextId}`, 
        stock: Math.floor(Math.random() * 200),
        sku: `DM-${nextId}`
    };
});

const initialProducts = [...baseProducts, ...copies];

const getStockStatus = (product) => {
    if (product.stock === 0) return 'out-of-stock';
    if (product.stock <= 10) return 'low-stock';
    if (product.status === 'active') return 'active';
    return 'inactive';
};

const ProductManagement = () => {
    const [products] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);

    // TRẠNG THÁI LỌC
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState(new Set()); 
    const [selectedBrands, setSelectedBrands] = useState(new Set()); 
    const [maxStockFilter, setMaxStockFilter] = useState(1000);

    // HANDLER LỌC TỒN KHO 
    const handleMaxStockChange = (value) => {
        setMaxStockFilter(value);
        setCurrentPage(1); 
    };

    // HANDLER LỌC CATEGORY
    const handleCategoryChange = (category, isChecked) => {
        setSelectedCategories(prev => {
            const newSet = new Set(prev);
            isChecked ? newSet.add(category) : newSet.delete(category);
            return newSet;
        });
        setCurrentPage(1); 
    };
    
    // HANDLER LỌC BRAND
    const handleBrandChange = (brand, isChecked) => {
        setSelectedBrands(prev => {
            const newSet = new Set(prev);
            isChecked ? newSet.add(brand) : newSet.delete(brand);
            return newSet;
        });
        setCurrentPage(1); 
    };

    // LOGIC LỌC DỮ LIỆU (CHỈ GIỮ LẠI PHIÊN BẢN MỚI NHẤT VÀ CHÍNH XÁC)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Lọc theo tìm kiếm (name, brand, SKU)
            const matchesSearch = searchTerm === '' || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            // 2. Lọc theo trạng thái
            if (statusFilter !== 'all') {
                const currentStatus = getStockStatus(product);
                if (currentStatus !== statusFilter) return false;
            }
            
            // 3. LỌC THEO CATEGORY
            const categoriesArray = Array.from(selectedCategories);
            if (categoriesArray.length > 0) {
                if (!categoriesArray.includes(product.category)) return false;
            }
            
            // 4. LỌC THEO BRAND
            const brandsArray = Array.from(selectedBrands);
            if (brandsArray.length > 0) {
                if (!brandsArray.includes(product.brand)) return false;
            }
           
            // 5. LỌC THEO TỒN KHO
            if (product.stock > maxStockFilter) { // Sử dụng product.stock
                return false;
            }
            return true;
        });

    }, [products, searchTerm, statusFilter, selectedCategories, selectedBrands, maxStockFilter]); 
    
    // --- CÁC HANDLER KHÁC (GIỮ NGUYÊN) ---
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [selectedProductIds, setSelectedProductIds] = useState(new Set());   
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); 
    };
    
    const handleSelectProduct = (id, isChecked) => {
        setSelectedProductIds(prev => {
            const newSet = new Set(prev);
            isChecked ? newSet.add(id) : newSet.delete(id);
            return newSet;
        });
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            const allIds = new Set(paginatedProducts.map(p => p.id));
            setSelectedProductIds(prev => new Set([...prev, ...allIds])); 
        } else {
            setSelectedProductIds(prev => {
                const newSet = new Set(prev);
                paginatedProducts.forEach(p => newSet.delete(p.id));
                return newSet;
            });
        }
    };

    const handleBulkDelete = () => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa ${selectedProductIds.size} sản phẩm đã chọn?`);
        if (confirmDelete) {
            alert(`Đã xóa thành công ${selectedProductIds.size} sản phẩm.`);
            setSelectedProductIds(new Set()); 
        }
    };
    
    const handleBulkEdit = () => {
        alert(`Mở modal chỉnh sửa cho ${selectedProductIds.size} sản phẩm...`);
    };

    const selectedOnCurrentPage = paginatedProducts.filter(p => selectedProductIds.has(p.id)).length;
    const isAllSelected = selectedOnCurrentPage > 0 && selectedOnCurrentPage === paginatedProducts.length;
    const isIndeterminate = selectedOnCurrentPage > 0 && !isAllSelected;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header onAddProduct={() => setIsModalOpen(true)} />
            
            <div className="flex">
                <Sidebar 
                    products={products}
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                    onSearchChange={setSearchTerm}
                    onStatusChange={setStatusFilter}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange} 
                    
                    selectedBrands={selectedBrands}
                    onBrandChange={handleBrandChange}
                    maxStockFilter={maxStockFilter}
                    onMaxStockChange={handleMaxStockChange}
                    
                    onResetFilters={() => { 
                        setSearchTerm(''); setStatusFilter('all'); setSelectedCategories(new Set()); 
                        setSelectedBrands(new Set()); setMaxStockFilter(1000); 
                        setCurrentPage(1); 
                    }}
                />
                
                <Table 
                    products={paginatedProducts} 
                    totalItems={totalItems}
                    
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    
                    selectedProductIds={selectedProductIds}
                    isAllSelected={isAllSelected}
                    isIndeterminate={isIndeterminate}
                    onSelectProduct={handleSelectProduct}
                    onSelectAll={handleSelectAll}
                    onBulkDelete={handleBulkDelete}
                    onBulkEdit={handleBulkEdit}
                    toggleDropdown={setDropdownOpenId}
                    dropdownOpenId={dropdownOpenId}
                />
            </div>

            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => { alert('Sản phẩm đã được thêm thành công!'); setIsModalOpen(false); }} />
        </div>
    );
};

export default ProductManagement;