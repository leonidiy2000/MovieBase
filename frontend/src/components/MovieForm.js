import { useState } from "react"
import { useMoviesContext } from "../hooks/useMoviesContext";

const MovieForm = () => {
    const {dispatch} = useMoviesContext();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movie = {title, director, year};
        const response = await fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        else {
            setTitle('');
            setDirector('');
            setYear('');
            setError(null);
            setEmptyFields([]);
            console.log('new movie added');
            dispatch({type: 'CREATE_MOVIE', payload: json});
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add a new Movie </h3>
            <label> Movie Title: </label> 
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label> Movie Director: </label> 
            <input 
                type="text"
                onChange={(e) => setDirector(e.target.value)}
                value={director}
                className={emptyFields.includes('director') ? 'error' : ''}
            />
            <label> Movie Year: </label> 
            <input 
                type="number"
                onChange={(e) => setYear(e.target.value)}
                value={year}
                className={emptyFields.includes('year') ? 'error' : ''}
            />
            <button> Add Movie </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MovieForm;