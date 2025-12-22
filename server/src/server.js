import http  from "http";
import { Server } from "socket.io";
import app from "./app.js";

import socketHandler from "./socket/index.js";
const PORT = process.env.PORT || 4000;

// HTTP 서버 생성
const server = http.createServer(app);

// Socket 서버 붙이기
const io = new Server(server, {
  cors: {
    origin: "*", // 개발용
  },
});

socketHandler(io);

// 서버 실행
server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});