// ProductManagement/ProductManagement.jsx
import React, { useState, useMemo, useEffect ,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchProducts, setFilters, setCurrentPage } from './productSlice'; 
import { fetchProductDetailByQuery } from '../../services/product.api';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Table from './components/Table';
import AddProductModal from './components/AddProductModal';
import ProductDetailModal from './components/ProductDetailModal';


const ProductManagement = () => {
    const dispatch = useDispatch();
    
    // LẤY DỮ LIỆU VÀ TRẠNG THÁI TỪ REDUX STORE
    const { products, loading, filters,error  } = useSelector(state => state.products);

    // TRẠNG THÁI LỌC & PHÂN TRANG TỪ REDUX
    const {store_id, status: statusFilter, categories: categoriesString, searchTerm: searchTermState } = filters;
    // const currentPage = useSelector(state => state.products.currentPage); 
    
    // TRẠNG THÁI PHÂN TRANG FE
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage, setItemsPerPage] = useState(20);

    // THÊM STATE CHO MODAL CHI TIẾT
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [productDetail, setProductDetail] = useState(null);

    // TRẠNG THÁI UI VÀ LỌC NỘI BỘ TẠM THỜI (Tồn kho và Brand)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [selectedProductIds, setSelectedProductIds] = useState(new Set()); 
    const [selectedBrands, setSelectedBrands] = useState(new Set()); 
    const selectedCategories = useMemo(() => new Set(categoriesString.split(',').filter(c => c)), [categoriesString]);

    const initialMount = useRef(true);

    // LOGIC GỌI API CHÍNH
    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
            return;
        }
        if (!store_id) {
            console.warn('store_id không được cung cấp. Bỏ qua fetchProducts.');
            return;
        }
        // Gửi tham số lọc và phân trang lên BE
        const params = {
            store_id, 
            status: statusFilter,
            categories: categoriesString };
         
        const isSearching = searchTermState && searchTermState.length > 0;
        const isCategoryFiltering = categoriesString && categoriesString.length > 0;

        if (isSearching) {
            params.status = searchTermState;
            console.log("Fetching: Searching Mode (status = search term)", params);
        } else if (isCategoryFiltering) {
            params.categories = categoriesString;
            params.status= statusFilter;
            console.log("Fetching: Category Filtering Mode", params);
        } else {
            params.status = statusFilter;
            console.log("Fetching: Default Mode (store_id, status='all')", params);
        }
        dispatch(fetchProducts(params));
        setCurrentPage(1);
    }, [dispatch, 
        store_id,
        filters.status, 
        filters.categories,
        filters.searchTerm, 
        filters.store_id
    ]); 


    // LOGIC LỌC NỘI BỘ (BRAND) - Chạy trên data từ API
    const filteredProducts = useMemo(() => {
        const productList = products || [];
        return productList.filter(product => {
            
            // LỌC BRAND NỘI BỘ
            const brandsArray = Array.from(selectedBrands);
            if (brandsArray.length > 0) {
                if (!brandsArray.includes(product.brand)) return false;
            }
            return true;
        });
    }, [products, selectedBrands]); 

    // --- PHÂN TRANG NỘI BỘ (FE) ---
    const totalItemsFE = filteredProducts.length;
    const totalPagesFE = Math.ceil(totalItemsFE / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage, itemsPerPage]);

    // HANDLERS (Sử dụng Redux Dispatch)
    const handleViewDetail = async (productId) => {
        setIsDetailModalOpen(true);
        setProductDetail(null); 

        if (!store_id || !productId) {
            console.error("Lỗi: Thiếu store_id hoặc productId.");
            setProductDetail({ error: "Lỗi dữ liệu: Không có ID cửa hàng hoặc ID sản phẩm." });
            return;
        }

        try {
            //TRUYỀN store_id VÀ productId VÀO HÀM API MỚI
            const detail = await fetchProductDetailByQuery(store_id, productId); 
            
            if (detail) {
                setProductDetail(detail); 
            } else {
                setProductDetail({ error: "Không tìm thấy sản phẩm này." });
            }
        } catch (error) {
            console.error("Lỗi khi tải chi tiết sản phẩm:", error);
            setProductDetail({ error: "Lỗi máy chủ khi tải chi tiết sản phẩm." });
        }
    };

    const handleStatusFilterChange = (status) => {
        dispatch(setFilters({ 
            status: status,
            searchTerm: ''
        }));
        setCurrentPage(1);
    };
    const handleSearchTermChange = (term) => {
        dispatch(setFilters({ 
            searchTerm: term, 
            categories: '', 
            status: 'all'
        }));
        setCurrentPage(1);
    };
    const handleCategoryChange = (category, isChecked) => {
        const categoriesArray = categoriesString ? categoriesString.split(',').filter(c => c) : [];
        const newCategoriesSet = new Set(categoriesArray);
        
        isChecked ? newCategoriesSet.add(category) : newCategoriesSet.delete(category);
        
        dispatch(setFilters({ 
            categories: Array.from(newCategoriesSet).join(','), 
            searchTerm: '', 
        }));
        setCurrentPage(1);
    };
    const handleBrandChange = (brand, isChecked) => {
        setSelectedBrands(prev => {
            const newSet = new Set(prev);
            isChecked ? newSet.add(brand) : newSet.delete(brand);
            return newSet;
        });
        setCurrentPage(1);
    };
    const handleItemsPerPageChange = (e) => { 
        setItemsPerPage(Number(e.target.value)); 
        setCurrentPage(1); 
    };
    const handleResetFilters = () => {
        dispatch(setFilters({ store_id: store_id, status: 'all', categories: '', searchTerm: '' })) 
        setSelectedBrands(new Set()); 
        setCurrentPage(1);
    };
    const handlePageChange = (page) => { if (page > 0 && page <= totalPagesFE) setCurrentPage(page); };
    const handleProductCreation = async (productData) => {
        try {
            // Thêm store_id vào dữ liệu trước khi gửi
            const dataWithStoreId = { ...productData, store_id }; 
            await createProduct(dataWithStoreId);
            setIsModalOpen(false);
            alert('Tạo sản phẩm thành công!');
            // Reload lại danh sách
            dispatch(fetchProducts(filters)); 
        } catch (err) {
            // Hiển thị lỗi trùng lặp từ Backend 
            alert(`Lỗi tạo sản phẩm: ${err.response?.data?.error || err.message}`);
        }
    };
    
    // LOGIC THAO TÁC HÀNG LOẠT

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

    

    const selectedOnCurrentPage = paginatedProducts.filter(p => selectedProductIds.has(p._id)).length;
    const isAllSelected = selectedOnCurrentPage > 0 && selectedOnCurrentPage === paginatedProducts.length;
    const isIndeterminate = selectedOnCurrentPage > 0 && !isAllSelected;
    
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

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header onAddProduct={() => setIsModalOpen(true)} />
            
            <div className="flex">
                <Sidebar 
                    products={products} 
                    searchTerm={searchTermState}
                    statusFilter={statusFilter}
                    onSearchChange={handleSearchTermChange}
                    onStatusChange={handleStatusFilterChange}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange} 
                    
                    selectedBrands={selectedBrands}
                    onBrandChange={handleBrandChange}
                    
                    onResetFilters={handleResetFilters}
                />
                
                <Table 
                    products={paginatedProducts} 
                    totalItems={totalItemsFE}
                    
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalPages={ totalPagesFE}
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
                    onViewDetail={handleViewDetail}
                />
            </div>
            <ProductDetailModal 
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                detail={productDetail} 
                loading={!productDetail && !productDetail?.error} 
            />
            <AddProductModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={() => { alert('Sản phẩm đã được thêm thành công!'); setIsModalOpen(false); }} 
            />
        </div>
    );
};

export default ProductManagement;