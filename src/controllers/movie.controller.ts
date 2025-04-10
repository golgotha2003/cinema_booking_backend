import { Request, Response } from "express";
import movieService from "../services/movie.service";
import { MovieRequestDto } from "../dto/req/movie.req.dto";

class MovieController {
  getAllMovies = async (req: Request, res: Response) => {
    try {
      const movies = await movieService.getAllMovies();

      return res.status(200).json({
        success: true,
        message: "Get all movies successfully",
        data: movies,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Get all movies failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  getMovieById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const movie = await movieService.getMovieById(id);

      return res.status(200).json({
        success: true,
        message: "Get movie by id successfully",
        data: movie,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Get movie by id failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  searchMovie = async (req: Request, res: Response) => {
    try {
      const query = req.params.query;
      const movies = await movieService.searchMovie(query);

      return res.status(200).json({
        success: true,
        message: "Search movie successfully",
        data: movies,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Search movie failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  getMoviesByGenre = async (req: Request, res: Response) => {
    try {
      const genre = req.params.genre;
      const movies = await movieService.getMoviesByGenre(genre);

      return res.status(200).json({
        success: true,
        message: "Get movies by genre successfully",
        data: movies,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Get movies by genre failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  addMovie = async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const posterFiles = files["poster"];
      const trailerFiles = files["trailer"];

      const posterUrl = posterFiles?.[0]?.path || "";
      const trailerUrl = trailerFiles?.[0]?.path || "";

      const movie: MovieRequestDto = {
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        release_date: req.body.release_date,
        language: req.body.language,
        genre: req.body.genre,
        rating: req.body.rating,
        status: req.body.status,
        poster: posterUrl,
        trailer: trailerUrl,
      };
      const newMovie = await movieService.addMovie(movie);

      return res.status(201).json({
        success: true,
        message: "Add movie successfully",
        data: newMovie,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Add movie failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  updateMovie = async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const posterFiles = files["poster"];
      const trailerFiles = files["trailer"];

      const posterUrl = posterFiles?.[0]?.path || "";
      const trailerUrl = trailerFiles?.[0]?.path || "";

      const id = req.params.id;
      const movie: MovieRequestDto = {
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        release_date: req.body.release_date,
        language: req.body.language,
        genre: req.body.genre,
        rating: req.body.rating,
        status: req.body.status,
        poster: posterUrl,
        trailer: trailerUrl,
      };

      const updatedMovie = await movieService.updateMovie(id, movie);

      return res.status(200).json({
        success: true,
        message: "Update movie successfully",
        data: updatedMovie,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Update movie failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  deleteMovie = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await movieService.deleteMovie(id);

      return res.status(204).json({
        success: true,
        message: "Delete movie successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Delete movie failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  disableMovie = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await movieService.disableMovie(id);

      return res.status(204).json({
        success: true,
        message: "Disable movie successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Disable movie failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}

export default new MovieController();
