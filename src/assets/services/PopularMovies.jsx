import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth/movies/popular`;

 const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data); // Log full response
        return response.data.results || []; // Ensure it returns an array
    } catch (error) {
        console.error("Error fetching movies:", error);
        return []; // Return empty array on error
    }
};

export default fetchPopularMovies;
