import axiosInstance from "./axios";
const BASE_URL = "products";

const cleanParams = (params) => {
    const cleaned = {};
    for (const key in params) {
        const value = params[key];
        
        // Loại bỏ null, undefined, chuỗi rỗng
        if (value !== null && value !== undefined && value !== '') {
            
            // Loại bỏ các giá trị mặc định không cần thiết cho API 
            if (key === 'categories' && value === '') {
                continue; 
            }
            
            if (key === 'status' && value === 'all') {
                 cleaned[key] = value;
                 continue;
            }

            cleaned[key] = value;
        }
    }
    return cleaned;
};

export const getProducts = async (params) => {
    try {
        const url = BASE_URL; 

        const filteredParams = cleanParams(params);

        // Hiển thị URL đầy đủ với tham số truy vấn trong console ( ktra  có thể xóa sau)
        const urlParams = new URLSearchParams(filteredParams).toString();
        const fullUrl = `${axiosInstance.defaults.baseURL}/${url}?${urlParams}`;
        console.log("-> ĐANG GỌI API:", fullUrl);

        const response = await axiosInstance.get(url, {
            params: filteredParams // Truyền tất cả tham số lọc (q, status, categories, page, limit)
        });
        
        console.log("Fetched product data:", response.data);
        return response.data;
        
    } catch (error) {

        console.error("Error fetching product list:", error);

        if (error.response && error.response.status === 400) {
            console.error("LỖI 400: Dữ liệu gửi lên không hợp lệ hoặc thiếu tham số bắt buộc (kiểm tra store_id). Chi tiết Server Message:", error.response.data.message);
        } 
        throw error;
    }   
};

export const fetchProductDetailByQuery = async (storeId, productId) => {
    try {
        const url = BASE_URL; 
        const params = {
            store_id: storeId,
            id: productId
        };
        const filteredParams = cleanParams(params); 

        const response = await axiosInstance.get(url, {
            params: filteredParams
        });
        
        console.log("-> Fetched product detail by Query Params:", response.data);
     
        return response.data.data ? response.data.data[0] : null; 
        
    } catch (error) {
        console.error("Error fetching product detail by query:", error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    // Gọi đến /products
    const url = BASE_URL; 
    const response = await axiosInstance.post(url, productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    // Gọi đến /products/:id
    const url = `${BASE_URL}/${id}`; 
    const response = await axiosInstance.put(url, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    // Gọi đến /products/:id
    const url = `${BASE_URL}/${id}`;
    const response = await axiosInstance.delete(url);
    return response.data;
};

export const bulkDeleteProducts = async (productIds) => {
    // Gọi đến /products/bulk-delete
    const url = `${BASE_URL}/bulk-delete`; 
    // productIds thường là một mảng ID: { ids: [1, 2, 3] }
    const response = await axiosInstance.post(url, { productIds }); 
    return response.data;
};