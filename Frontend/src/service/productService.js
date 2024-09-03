import { apiClient} from "../api/apiClient";

const getProducts = async () => {
    try {
        const res = await apiClient.get("Products");
        return res.data;
    } catch (error) {
        throw error;
    }
};


export { getProducts };
