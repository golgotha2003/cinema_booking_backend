import { Genre } from "../../utils/movie/genre.enum";
import { MovieStatus } from "../../utils/movie/status.enum";

export interface MovieRequestDto {
    title: string;
    description: string;
    duration: number;
    release_date: Date;
    language: string;
    genre: Genre[];
    rating: number;
    status: MovieStatus;
    poster: string;
    trailer: string;
}