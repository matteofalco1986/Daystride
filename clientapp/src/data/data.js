import axios from 'axios';

export const Endpoint = "http://localhost:5000"

// Function to fetch anti-forgery token
export const fetchAntiForgeryToken = async () => {
    try {
        const response = await axios.get(Endpoint + '/api/antiforgery/generate-token');
        return response.data.token;
    } catch (error) {
        console.error('Error fetching anti-forgery token:', error);
        return null;
    }
};

