import http from "http";
import { Server } from "socket.io";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    },
});

io.on("connection", (socket) => {
    console.log("📡 New client connected:", socket.id);
  
    socket.on("message", (data) => {
      console.log("📩 Received from client:", data);
      socket.emit("message", `Server received: ${data}`);
    });
  
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

server.listen(Number(process.env.PORT), () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
  });