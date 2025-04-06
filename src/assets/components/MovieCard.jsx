import "../css/MovieCard.css"; 

function MovieCard({ movieProp }) {

  
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movieProp.poster_path}`} alt={movieProp.title} className="movie-image" />
      <div className="movie-info">

        <h2 className="movie-title">{movieProp.title || movieProp.name}</h2>
        <p className="movie-date">{movieProp.release_date || movieProp.first_air_date}</p>
        <p className="movie-overview">{movieProp.overview}</p>
        
      </div>
    </div>
  );
}

export default MovieCard;
