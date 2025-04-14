import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "../services/fetchMediaDetails";
import "../css/MoviePage.css";
import { getReviews } from "../services/getReviews";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const token = localStorage.getItem('token');
const MoviePage = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    fetchMediaDetails(type, id).then(setMovie);
    
  }, [type, id]);

  useEffect(() => {
    getReviews(id).then(setReviews); 
    console.log(reviews.username); 
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); 
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
  }, []);
  
 const navigate = useNavigate();   
      
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if(!token){
      alert('Please log in to submit a review.');
      navigate('/login');
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Reviews/add`,
        { content: newReview, movieId: id, userId : userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true 
        }
      );
      alert('Review submitted!');
      setNewReview('');
      getReviews(id).then(setReviews);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-background-wrapper" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

    <div className="media-container">
      {/* Left - Poster */}
      <div className="poster-section">
  <div
    className="poster-background"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
    }}
  ></div>
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title || movie.name}
    className="media-poster"
  />
</div>


      {/* Right - Details and Reviews */}
      <div className="content-section">
        <div className="details-section">
          <h1 className="media-title">{movie.title || movie.name}</h1>
          <p className="media-overview">{movie.overview}</p>

          <div className="genre-container">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="media-meta">
             <p><strong>Release Date:</strong> {movie.release_date}  {movie.first_air_date}</p>
            
          </div>
        </div>

        <div className="reviews-section">
          <h2>Write a Review</h2>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            rows="4"
            className="review-textarea"
          />
          <button onClick={handleReviewSubmit} className="submit-review-btn">Submit</button>

          <h2>User Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.username}</strong>:</p>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
