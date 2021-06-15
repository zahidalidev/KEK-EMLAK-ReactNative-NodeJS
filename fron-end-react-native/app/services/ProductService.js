import axios from "axios";
import config from "../config/config.json";

const apiEndPoint = config.apiEndPoint + '/api' + '/products';

export const getAllProducts = async () => {
    return await axios.get(apiEndPoint)
}

export const getProductsById = async (id) => {
    return await axios.get(`${apiEndPoint}/${id}`)
}

export const handeAddProduct = async (image, data) => {
    return await axios.post(apiEndPoint,
        JSON.stringify({
            imgsource: image.base64,
            data
        }),
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        },

    );
}


