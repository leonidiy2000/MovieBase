const express = require('express');
const router = express.Router();
const {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
} = require('../controllers/movieController');

//GET all
router.get('/', getMovies);

//GET single
router.get('/:id', getMovie)

//POST new 
router.post('/', createMovie);

//DELETE  
router.delete('/:id', deleteMovie);

//UPDATE  
router.patch('/:id', updateMovie);

module.exports = router;