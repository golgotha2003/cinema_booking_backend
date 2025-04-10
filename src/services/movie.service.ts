import { MovieRequestDto } from "../dto/req/movie.req.dto";
import Movie from "../models/movie";
import { MovieStatus } from "../utils/movie/status.enum";

/**
 * Service class for movie model
 */
class MovieService {
    /**
     * Get all movies
     */
    getAllMovies = async () => {
        const movies = await Movie.find();

        return movies;
    }

    /**
     * Get a movie by id
     * @param id movie id
     */
    getMovieById = async (id: string) => {
        const movie = await Movie.findById(id);

        if (!movie) throw new Error("Movie not found");

        return movie;
    }

    /**
     * Search movies by title
     * @param query search query
     */
    searchMovie = async (query: string) => {
        const movies = await Movie.find({ title: { $regex: query, $options: "i" } });

        return movies;
    }

    /**
     * Get movies by genre
     * @param genre movie genre
     */
    getMoviesByGenre = async (genre: string) => {
        const movies = await Movie.find({ genre });

        return movies;
    }

    /**
     * Add a new movie
     * @param movie movie data
     */
    addMovie = async (movie: MovieRequestDto) => {

        const existingMovie = await Movie.findOne({ title: movie.title });

        if (existingMovie) throw new Error("Movie already exist");

        const newMovie = new Movie(movie);

        await newMovie.save();

        return newMovie;
    }

    /**
     * Update a movie
     * @param id movie id
     * @param movie movie data
     */
    updateMovie = async (id: string, movie: MovieRequestDto) => {
        const existingMovie = await Movie.findById(id);

        if (!existingMovie) throw new Error("Movie not found");

        existingMovie.title = movie.title;
        existingMovie.description = movie.description;
        existingMovie.duration = movie.duration;
        existingMovie.release_date = movie.release_date;        
        existingMovie.language = movie.language;
        existingMovie.genre = movie.genre;
        existingMovie.rating = movie.rating;
        existingMovie.status = movie.status;
        existingMovie.poster = movie.poster;
        existingMovie.trailer = movie.trailer;

        await existingMovie.save();

        return existingMovie;
    }

    /**
     * Disable a movie
     * @param id movie id
     */
    disableMovie = async (id: string) => {
        const existingMovie = await Movie.findById(id);

        if (!existingMovie) throw new Error("Movie not found");

        existingMovie.status = MovieStatus.DELETED;

        await existingMovie.save();
    }

    /**
     * Delete a movie
     * @param id movie id
     */
    deleteMovie = async (id: string) => {
        const existingMovie = await Movie.findById(id);

        if (!existingMovie) throw new Error("Movie not found");

        await existingMovie.deleteOne();
    }
}

export default new MovieService();
