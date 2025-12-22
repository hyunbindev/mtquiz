// src/app.js
import express from "express";
import cors from "cors";

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 테스트용 API
app.get("/", (req, res) => {
  res.send("MT Quiz API Server Running");
});

// 방 존재 확인 같은 API도 여기서
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
