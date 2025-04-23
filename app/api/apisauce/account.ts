import client from "../client"; 

const getAccount = async (id: any, options = {}) => {
    return client.get(
        `/account/${id}`,
        {
            ...options,
            headers:{
                "Accept":"Aplication/json"
            }
        }
    );
}; 

export default {
    getAccount
}