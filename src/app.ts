import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
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
      maxAge: 1000 * 60 * 60
    }
  })
);

//Connect to DB
connectDB();

//Routes
app.use("/api", initRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;