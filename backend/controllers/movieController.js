const { default: mongoose } = require('mongoose');
const Movie = require('../models/movieModel')

//get all
const getMovies = async (req, res) => {
    const movies = await Movie.find({}).sort({createdAt: -1});
    res.status(200).json(movies);
}

//get single
const getMovie = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movie'});
    }
    const movie = await Movie.findById(id);
    if (!movie) {
        return res.status(404).json({error: 'No such movie'});
    } 
    res.status(200).json(movie);
}

//create new
const createMovie = async (req, res) => {
    const {title, director, length, rating} = req.body;
    try {
        const movie = await Movie.create({title, director, length, rating});
        res.status(200).json(movie)
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

//delete
const deleteMovie = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movie'});
    }
    const movie = await Movie.findOneAndDelete({_id: id});
    if (!movie) {
        return res.status(404).json({error: 'No such movie'});
    } 
    res.status(200).json(movie);
}

//update
const updateMovie = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movie'});
    }
    const movie = await Movie.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if (!movie) {
        return res.status(404).json({error: 'No such movie'});
    } 
    res.status(200).json(movie);
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
}