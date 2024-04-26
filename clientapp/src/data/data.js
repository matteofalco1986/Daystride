import axios from 'axios';

export const Endpoint = "http://localhost:5000"
export const PexelsToken = "uhWpBzL0lUOncI509T4FSwMr6IFPiOwQOBBhE8Jb20uhucGnT8lPVsKr"
export const PexelsSearchEndpoint = "https://api.pexels.com/v1/search"
export const PexelsSearchQuery = "?query="
export const ZenQuotesEndpoint = "https://zenquotes.io/api/quotes"

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

