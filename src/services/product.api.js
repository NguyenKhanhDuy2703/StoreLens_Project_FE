import axiosInstance from "./axios";
const BASE_URL = "products";


export const getProducts = async ({storeId , page , limit}) => {
    try {
        const response =  await axiosInstance.get(`${BASE_URL}`, {
            params: {
                store_id: storeId,
                page: page,
                limit: limit,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return error.message;
    }
}
export const getCategories = async (storeId) => {
    try {
        const url = `${BASE_URL}/categories`;
        const response =  await axiosInstance.get(url, {
            params: { store_id: storeId }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return error.message;
    }
}