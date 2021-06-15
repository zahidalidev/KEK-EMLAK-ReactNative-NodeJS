import axios from "axios";
import config from "../config/config.json";

const apiEndPoint = config.apiEndPoint + '/products';

export const handeAddProduct = async (image) => {
    return await axios.post(apiEndPoint,
        JSON.stringify({
            imgsource: image.base64,
            data: {
                zahid: "Hi"
            }
        }),
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        },

    );
}
