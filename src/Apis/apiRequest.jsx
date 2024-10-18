import axios from 'axios';

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
        return response; // returning the response data
    } catch (error) {
        if (error.response) {  
            return error.response;
        } else if (error.request) {
            return { status: 500, data: { error: "Server not responding. Please try again later." } };
        } else {
            return { status: 500, data: { error: error.message } };
        }
    }
};

export default apiRequest;