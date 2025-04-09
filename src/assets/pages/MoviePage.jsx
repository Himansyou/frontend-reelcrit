import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "../services/fetchMediaDetails";
import "../css/MoviePage.css";
import { getReviews } from "../services/getReviews";

const MoviePage = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    fetchMediaDetails(type, id).then(setMovie);
    
  }, [type, id]);

  useEffect(() => {
    getReviews(id).then(setReviews); 
    console.log(reviews.username); 
  }, [id]);

  const handleReviewSubmit = () => {
    if (!newReview.trim()) return;

    const dummyUsername = "You"; // Replace with real user info when JWT/auth is implemented
    const reviewObject = {
      username: dummyUsername,
      content: newReview.trim(),
    };

    setReviews((prevReviews) => [reviewObject, ...prevReviews]);
    setNewReview("");
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="media-container">
      {/* Left - Poster */}
      <div className="poster-section">
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
            {movie.release_date && <p><strong>Release:</strong> {movie.release_date}</p>}
            <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
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
  );
};

export default MoviePage;
