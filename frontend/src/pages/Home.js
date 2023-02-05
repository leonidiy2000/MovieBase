import { useEffect, useState } from "react"

//components
import MovieDetails from "../components/MovieDetails";

const Home = () => {
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/api/movies');
            const json = await response.json();
            if (response.ok) setMovies(json);
        }
        fetchMovies();
    }, []);

    return (
      <div className="home">
        <div className="movies">
            {movies && movies.map((movie) => (
                <MovieDetails key={movie._id} movie={movie} />
            ))}
        </div>
      </div>
    )
  }
  
  export default Home