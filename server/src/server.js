import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import logger from "#loader/logger";
import config from "#loader/config";
import { connectRedis } from "#loader/redisClient";
import {sessionMiddleware} from '#loader/session';
import socketHandler from "#socket/index";
// 1. HTTP 서버 생성
const server = http.createServer(app);

// 2. Socket.io 설정
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.engine.use(sessionMiddleware);

const startServer = async () => {
  try {
    await connectRedis();
    socketHandler(io);
    server.listen(config.port || 4000, () => {
      logger.info(`Server running on port ${config.port || 4000}`);
    });

  } catch (error) {
    logger.error("Server start failed", { error });
    process.exit(1);
  }
};

startServer();