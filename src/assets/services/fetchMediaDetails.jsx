
import axios from "axios";

export const fetchMediaDetails = async (type, id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/movies/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching media details:", error);
    return null;
  }
};
