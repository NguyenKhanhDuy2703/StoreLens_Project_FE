import { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Package, TrendingUp, TrendingDown, Filter, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProducts, fetchGetCategories } from './products.thunk';
import { prevPage, nextPage } from './productSlice';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const dispatch = useDispatch();
  const { informationStores } = useSelector((state) => state.user);
  const { categories, products, limit, totalPages, currentPage, totalItems, loading } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (informationStores && informationStores.length > 0) {
      dispatch(fetchGetCategories({ storeId: informationStores[0].store_id }));
      dispatch(fetchGetProducts({ storeId: informationStores[0].store_id, page: currentPage, limit: limit }));
    }   
  }, [dispatch, informationStores, currentPage, limit]);

  const filteredProducts = products?.filter(product =>
    (searchTerm === '' || 
     product.name_product.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.product_id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || product.category_name === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  from-purple-50 via-white to-blue-50">
      <div className="w-full mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-semibold">+12%</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">Tổng sản phẩm</p>
            <p className="text-3xl font-bold text-gray-900">{totalItems || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                <span className="text-xs text-blue-600 font-semibold">87.3%</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">Đang kinh doanh</p>
            <p className="text-3xl font-bold text-gray-900">{products?.filter(p => p.status)?.length || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg">
                <span className="text-xs text-red-600 font-semibold">Cảnh báo</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">Hết hàng</p>
            <p className="text-3xl font-bold text-gray-900">{products?.filter(p => p.stock_quantity === 0)?.length || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-semibold">+5.2%</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">Giá trị kho</p>
            <p className="text-3xl font-bold text-gray-900">
              ₫{(products?.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0) / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            <div className="relative min-w-[240px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer font-medium text-gray-700"
              >
                <option value="all">Tất cả danh mục</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 font-medium">Bộ lọc:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                  <Search className="w-3.5 h-3.5" />
                  "{searchTerm}"
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:bg-purple-100 rounded p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                  <Filter className="w-3.5 h-3.5" />
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:bg-blue-100 rounded p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mã SP</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tên sản phẩm</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Danh mục</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Thương hiệu</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Giá bán</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Tồn kho</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Trạng thái</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-16">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200"></div>
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <p className="text-gray-500 font-medium">Đang tải dữ liệu...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.product_id} className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/30 transition-all duration-200">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm text-purple-600 font-semibold bg-purple-50 px-2 py-1 rounded">
                          {product.product_id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                            <Package className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">{product.name_product}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200">
                          {product.category_name}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 font-semibold">{product.brand}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="font-bold text-gray-900 text-base">₫{product.price.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`font-bold text-lg ${
                            product.stock_quantity === 0 ? 'text-red-600' :
                            product.stock_quantity < 100 ? 'text-orange-600' : 
                            'text-green-600'
                          }`}>
                            {product.stock_quantity}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">{product.unit}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          product.status
                            ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200'
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300'
                        }`}>
                          {product.status ? '✓ Đang bán' : '⊗ Tạm ngưng'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-all hover:scale-110 hover:shadow-md">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 hover:bg-red-50 text-red-600 rounded-lg transition-all hover:scale-110 hover:shadow-md">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-16">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm nào</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && products && products.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-bold text-purple-600">{((currentPage - 1) * limit) + 1}-{Math.min(currentPage * limit, totalItems)}</span> trong <span className="font-bold text-purple-600">{totalItems}</span> sản phẩm
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(prevPage())}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow"
                >
                  ← Trước
                </button>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (pageNum !== currentPage) {
                          dispatch(fetchGetProducts({ 
                            storeId: informationStores[0].store_id, 
                            page: pageNum, 
                            limit: limit 
                          }));
                        }
                      }}
                      className={`px-4 py-2 rounded-lg transition-all font-semibold shadow-sm ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => dispatch(nextPage())}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;