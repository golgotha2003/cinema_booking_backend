import { Request } from "express";

export interface IRequestWithFiles extends Request {
  files: {
    poster?: Express.Multer.File[]; // Poster là 1 file (hoặc không có)
    trailer?: Express.Multer.File[]; // Trailer là 1 file (hoặc không có)
  };
}
