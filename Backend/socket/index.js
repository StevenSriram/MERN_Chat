import { configEnv } from "../config.js";
configEnv();

import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

export { app, server };
