const express = require('express');
const { getMovies, createMovie, getMovieById } = require('../controllers/movieController');
const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.get('/:id', getMovieById);

module.exports = router;
