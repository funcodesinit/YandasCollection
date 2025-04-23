 
import client from "../client";

const getListing = async (options = {}) => {
    try {
        const params = new URLSearchParams();

        // Convert categoryId array to a comma-separated string
        if (options.categoryId && Array.isArray(options.categoryId)) {
            params.append("categoryId", options.categoryId.join(","));
        }

        // Append other query params if needed
        if (options.minPrice) params.append("minPrice", options.minPrice);
        if (options.maxPrice) params.append("maxPrice", options.maxPrice);

        const response = await client.get(
            `/products?${params.toString()}`, // Ensure proper query formatting
            {
                headers: {
                    "Accept": "application/json",
                    ...(options.headers || {})
                }
            }
        );

        return response;
    } catch (error) {
        console.error("Error fetching product list:", error);
        throw error;
    }
};

const getDetails = async (id: any, options = {}) => {
    return client.get(
        `/products/${id}`,
        {
            ...options,
            headers:{
                "Accept":"Aplication/json"
            }
        }
    );
};
 
export default {
    getListing,
    getDetails
};
