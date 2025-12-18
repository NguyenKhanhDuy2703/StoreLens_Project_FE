import { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Package, TrendingUp, TrendingDown, Filter, ChevronDown, X, Save } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProducts, fetchGetCategories } from './products.thunk';
import { prevPage, nextPage } from './productSlice';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
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

  const handleEdit = (product) => {
    setEditingProduct({...product});
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // TODO: Dispatch action để update sản phẩm
    // dispatch(updateProduct(editingProduct));
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      // TODO: Dispatch action để xóa sản phẩm
      // dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Stats Cards - Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-green-600 font-semibold">+12%</span>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">Tổng sản phẩm</p>
            <p className="text-xl font-bold text-gray-900">{totalItems}</p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-blue-600 font-semibold">87.3%</span>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">Đang kinh doanh</p>
            <p className="text-xl font-bold text-gray-900">{products?.filter(p => p.status)?.length}</p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-red-600 font-semibold">Cảnh báo</span>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">Hết hàng</p>
            <p className="text-xl font-bold text-gray-900">{products?.filter(p => p.stock_quantity === 0)?.length}</p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-purple-500 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-green-600 font-semibold">+5.2%</span>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">Giá trị kho</p>
            <p className="text-xl font-bold text-gray-900">
              ₫{(products?.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0) / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        {/* Filters & Search - Compact */}
        <div className="bg-white rounded-xl p-3 mb-4 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
              >
                <option value="all">Tất cả danh mục</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Table - Compact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Mã SP</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Tên sản phẩm</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Danh mục</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Thương hiệu</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Giá bán</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Tồn kho</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Trạng thái</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-3 border-purple-200 border-t-purple-600"></div>
                        <p className="text-sm text-gray-500">Đang tải...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.product_id} className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors">
                      <td className="py-2 px-3">
                        <span className="font-mono text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded">
                          {product.product_id}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">{product.name_product}</p>
                            <p className="text-xs text-gray-500">{product.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200">
                          {product.category_name}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-sm text-gray-700 font-medium">{product.brand}</span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className="font-semibold text-sm text-gray-900">₫{product.price.toLocaleString()}</span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`font-bold text-base ${
                          product.stock_quantity === 0 ? 'text-red-600' :
                          product.stock_quantity < 100 ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${
                          product.status
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}>
                          {product.status ? '✓ Đang bán' : '⊗ Ngưng'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.product_id)}
                            className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">Không tìm thấy sản phẩm</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Compact */}
          {!loading && products && products.length > 0 && (
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-600">
                Hiển thị <span className="font-semibold text-purple-600">{((currentPage - 1) * limit) + 1}-{Math.min(currentPage * limit, totalItems)}</span> / <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => dispatch(prevPage())}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
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
                      className={`px-3 py-1 text-xs rounded-lg transition-colors font-medium ${
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => dispatch(nextPage())}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Chỉnh sửa sản phẩm</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mã sản phẩm</label>
                  <input
                    type="text"
                    value={editingProduct.product_id}
                    disabled
                    className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Đơn vị</label>
                  <input
                    type="text"
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({...editingProduct, unit: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  value={editingProduct.name_product}
                  onChange={(e) => setEditingProduct({...editingProduct, name_product: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Danh mục</label>
                  <select
                    value={editingProduct.category_name}
                    onChange={(e) => setEditingProduct({...editingProduct, category_name: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Thương hiệu</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Giá bán (₫)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tồn kho</label>
                  <input
                    type="number"
                    value={editingProduct.stock_quantity}
                    onChange={(e) => setEditingProduct({...editingProduct, stock_quantity: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.status}
                    onChange={(e) => setEditingProduct({...editingProduct, status: e.target.checked})}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Đang kinh doanh</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;