const MovieDetails = ({movie}) => {
    return (
        <div className="movie-details">
            <h4>{movie.title}</h4>
            <p><strong> Director: </strong> {movie.director} </p>
            <p>{movie.createdAt}</p>
        </div>
    )
}

export default MovieDetails;