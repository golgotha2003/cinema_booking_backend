import dotenv from "dotenv";
import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./db/dbConnect";
import initRoutes from "./routes/init.route";
import session from "express-session";

const app: Application = express();

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", // Chỉ định frontend Vite
  credentials: true // Cho phép gửi cookies, sessions...
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "none"
    }
  })
);

//Connect to DB
connectDB();

//Routes
app.use("/api", initRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};

app.use(errorHandler);

export default app;