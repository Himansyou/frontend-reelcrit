
import axios from "axios";

export const getReviews = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/movies/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching media details:", error);
    return null;
  }
};
