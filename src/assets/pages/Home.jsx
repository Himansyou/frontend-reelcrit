import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import PopularMovies from "../services/PopularMovies"; 
import SearchMovies from "../services/SearchMovies";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

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
    useEffect(() => {
        const token = localStorage.getItem('token');
      
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1])); // decode payload
            const isExpired = payload.exp * 1000 < Date.now(); // exp is in seconds, Date.now() in ms
      
            if (isExpired) {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
            } else {
              setIsLoggedIn(true);
      
              // auto-logout when it expires
              const timeout = setTimeout(() => {
                handleLogout(); 
              }, payload.exp * 1000 - Date.now());
      
              return () => clearTimeout(timeout); // cleanup
            }
          } catch (err) {
            console.error("Invalid token format:", err);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }
        }
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
        
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
      }, []);

    return (
            <>
        <div className="homepage-background">
      <div className="bg-1"></div>
      <div className="bg-2"></div>
      <div className="bg-3"></div>
        <div className="bg-4"></div>
        <div className="bg-5"></div>
      </div> 
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
        </>
      
    );
};

export default Home;
