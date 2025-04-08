import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import PopularMovies from "../services/PopularMovies"; 
import SearchMovies from "../services/SearchMovies";
import { Link } from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await PopularMovies();
                const withType = data.map(movie => ({
                    ...movie,
                    type: movie.title ? "movie" : "tv"
                  }));
              
                  setMovies(withType);
                
            } catch (error) {
                console.error("Error loading movies:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/'); // optional: send back to home
      };


    const handleSearch = async () => {
        if (!searchTerm.trim()) return; 
        try {
            setLoading(true);
            const data = await SearchMovies(searchTerm);
            const withType = data.map(movie => ({
                ...movie,
                type: movie.title ? "movie" : "tv"
              }));
          
              setMovies(withType);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // sets to true if token exists
      }, []);

    return (
        
        <div className="home">
            
            <div className="home-header">
                <div> 
                    <h1>ReelCrit</h1>
                    <h6>Home to all the Cinephiles</h6>
                </div>
                
                <div className="home-header-buttons">
                {isLoggedIn ? (
                <button  onClick={handleLogout}>Logout</button>
                 ) : (  
                <>    
                    <Link to="/login" >Login</Link>
                    <Link to="/register" >Register</Link>
                </>
)}
                </div>
            
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies or series..."
                        value={searchTerm} // Controlled input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        
                        
                    />
                    <button className="search-button" onClick={handleSearch}>
                        🔍 Search
                    </button>
                </div>
            </div>
      

            {/* Movie Grid */}
            <div className="movie-grid">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    movies.map((movie) =>{  return <MovieCard key={movie.id} movieProp={movie} />  })
                    
                )}
                
            </div>
        </div>
    );
};

export default Home;
