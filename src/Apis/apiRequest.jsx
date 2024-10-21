import axios from 'axios';
import { toast } from 'react-toastify';

const domain = import.meta.env.VITE_API_URL;

const apiRequest = async ({ endpoint, method = 'GET', data = {}, headers = {} }) => {
    try {
        const config = {
            url: `${domain}${endpoint}`,
            method,
            headers,
            data,
        };
        const response = await axios(config);
        // toast.success(response.data.message);
        return response; // returning the response data
    } catch (error) {
        if (error.response) {  
            // toast.error(error.response.data.message || "An error occurred!");
            return error.response;
        } else if (error.request) {
            // toast.error("Server not responding. Please try again later.");
            return { status: 500, data: { error: "Server not responding. Please try again later." } };
        } else {
            // toast.error(error.message || "An unexpected error occurred.");
            return { status: 500, data: { error: error.message } };
        }
    }
};

export default apiRequest;