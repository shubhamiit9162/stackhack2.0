const Movie = require('../models/Movie');

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new movie
exports.createMovie = async (req, res) => {
    const { title, language, genre, duration, isAdult, castDetails, releaseDate, story, trailer } = req.body;
    try {
        const newMovie = new Movie({ title, language, genre, duration, isAdult, castDetails, releaseDate, story, trailer });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
