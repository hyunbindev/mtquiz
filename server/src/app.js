// src/app.js
import express from "express";
import cors from "cors";
import authRouter from '#api/router/auth';
import {sessionMiddleware} from '#loader/session';
const app = express();

const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}

// 미들웨어
app.use(cors(corsOption));
app.use(express.json());
app.use(sessionMiddleware);

app.use('/api/auth',authRouter);

// 테스트용 API
app.get("/", (req, res) => {
  res.send("MT Quiz API Server Running");
});

export default app;  