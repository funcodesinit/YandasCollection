 
import client from "../client";



const getListing = async (options = {}) => {
    return client.get(
        `/products/sizes`,
        {
            ...options,
            headers:{
                "Accept":"Aplication/json"
            }
        }
    );
};

export default {
    getListing
}