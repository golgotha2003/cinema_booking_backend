import dotenv from "dotenv";
import express, { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import session from "express-session";
import { createClient } from "redis";
import { connectDB } from "./db/dbConnect";
import initRoutes from "./routes/init.route";
import { RedisStore } from "connect-redis";

dotenv.config();

const app: Application = express();

// Khởi tạo Redis client
const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

// Kết nối Redis
(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Connected to Redis");
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();

// Cấu hình middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend (Vite)
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình session sử dụng Redis
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: "sess:", // prefix key trong Redis (tùy chọn)
    }),
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true nếu dùng HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 giờ
      sameSite: "none", // dùng "none" nếu frontend và backend chạy khác domain và có HTTPS
    },
  })
);

// Kết nối database
connectDB();

// Định tuyến
app.use("/api", initRoutes);

// Test Redis route
app.get("/", async (req, res) => {
  await redisClient.set("message", "Hello Redis from Express!");
  const msg = await redisClient.get("message");
  res.send(msg);
});

// Xử lý lỗi toàn cục
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};

app.use(errorHandler);

export default app;
