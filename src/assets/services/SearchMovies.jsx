import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth/movies/search`;

const searchMovies = async (movieName) => {
    try {
        const response = await axios.get(`${API_URL}/${movieName}`);
        console.log("API Response:", response.data);
        return response.data || []; 
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export default searchMovies;
