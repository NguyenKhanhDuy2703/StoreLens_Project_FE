// ProductManagement/components/Sidebar.jsx
import React, { useState, useMemo } from 'react'; 

// Hàm tính toán số lượng theo trạng thái
const calculateStatusCounts = (products) => {
    const productList = products || [];
    const counts = { 'all': 0, 'active': 0, 'inactive': 0 };
    
    productList.forEach(p => {
        let status;
        if (p.status === 'active' || p.status=== true ) status = 'active';
        else status = 'inactive';
        
        counts[status] = (counts[status] || 0) + 1;
        counts['all']++;
    });
    return { ...counts, 'all': productList.length };
};

// Hàm tính toán Danh mục và Thương hiệu động
const calculateFilterCounts = (products, keyName) => {
    const productList = products || [];
    const filterMap = new Map();
    productList.forEach(p => {
        const item = p[keyName]; 
        if (item) {
            filterMap.set(item, (filterMap.get(item) || 0) + 1);
        }
    });
    return Array.from(filterMap, ([label, count]) => ({ label, count }));
};


const Accordion = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const iconClass = `w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`;
    const contentClass = `transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`;

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                className="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={contentClass}>
                <div className="pt-3 pb-3 px-4"> 
                    {children}
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ 
    products, searchTerm, statusFilter, 
    onSearchChange, onStatusChange, onResetFilters,
    selectedCategories, onCategoryChange,
    selectedBrands, onBrandChange
}) => {
    const statusCounts = calculateStatusCounts(products);
    
    // Tính toán Danh mục và Thương hiệu động
    const categoryData = useMemo(() => calculateFilterCounts(products, 'category_name'), [products]);
    const brandData = useMemo(() => calculateFilterCounts(products, 'brand'), [products]);


    return (
        <div className="w-80 min-h-screen border-r border-gray-200" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
            <div className="p-6">
                
                {/* Thanh tìm kiếm */}
                <div className="mb-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Tìm theo tên, SKU, barcode..." 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                {/* Lọc theo trạng thái */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Trạng thái</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Tất cả', value: 'all', dot: 'bg-blue-500' },
                            { label: 'Đang bán', value: 'active', dot: 'bg-green-500' },
                            { label: 'Dừng bán', value: 'inactive', dot: 'bg-gray-500' }
                        ].map(({ label, value, dot }) => {
                            
                            const isSearchMode = searchTerm && searchTerm.length > 0;
                            const isChecked = isSearchMode ? (statusFilter === value) : (statusFilter === value);
                            
                            return (
                                <label key={value} className="flex items-center cursor-pointer">
                                    <input type="radio" name="status" value={value} className="sr-only" checked={isChecked} onChange={() => onStatusChange(value)} />
                                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center">
                                        <div className={`w-2 h-2 rounded-full ${dot} ${isChecked ? '' : 'hidden'}`}></div>
                                    </div>
                                    <span className="text-sm text-gray-700">{label}</span>
                                    
                                </label>
                            );
                        })}
                    </div>
                </div>
                
                {/* Lọc chi tiết */}
                <div className="space-y-4">
                    
                    {/* ACCORDION DANH MỤC */}
                    <Accordion title="Danh mục" defaultOpen={true}>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {categoryData.map((cat) => (
                                <label key={cat.label} className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox-custom mr-3" 
                                        checked={selectedCategories.has(cat.label)}
                                        onChange={(e) => onCategoryChange(cat.label, e.target.checked)}
                                    />
                                    <span className="text-sm text-gray-700">{cat.label}</span>
                                    <span className="ml-auto text-xs text-gray-500">({cat.count})</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>
                    
                    {/* ACCORDION THƯƠNG HIỆU */}
                    <Accordion title="Thương hiệu" defaultOpen={true}>
                         <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {brandData
                                .sort((a, b) => b.count - a.count)
                                .map((brand) => (
                                <label key={brand.label} className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox-custom mr-3" 
                                        checked={selectedBrands.has(brand.label)} 
                                        onChange={(e) => onBrandChange(brand.label, e.target.checked)} 
                                    />
                                    <span className="text-sm text-gray-700">{brand.label}</span>
                                    <span className="ml-auto text-xs text-gray-500">({brand.count})</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>
                </div>
                
                
                {/* Nút Reset */}
                <div className="mt-6">
                    <button 
                        className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={onResetFilters}
                    > 
                        Xóa tất cả bộ lọc 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;