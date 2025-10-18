import axiosInstance  from "./axios"
export const getPeopleEntrened = async (store_id , range) => {
    try {
    const url = "dashboard/entered"
        const response = await axiosInstance.get(url , {
            params:{
                store_id,
                range
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {

        console.error("Error fetching people entrened data:", error);
        throw error;
    }   
};
