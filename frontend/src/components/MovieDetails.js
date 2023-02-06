import { useMoviesContext } from "../hooks/useMoviesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const MovieDetails = ({movie}) => {
    const {dispatch} = useMoviesContext();
    const handleClick = async () => {
        const response = await fetch('/api/movies/' + movie._id, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({type: "DELETE_MOVIE", payload: json});
        }

    }
    return (
        <div className="movie-details">
            <h4>{movie.title}</h4>
            <p><strong> Director: </strong> {movie.director} </p>
            <p><strong> Year: </strong> {movie.year} </p>
            <p>{formatDistanceToNow(new Date(movie.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default MovieDetails;