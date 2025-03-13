import express from "express";
import cookieParser from "cookie-parser";
import { configEnv } from "../config.js";
configEnv();

import connectDB from "./db/configDB.js";

import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// * Middlewares
app.use(express.json());
app.use(cookieParser());

// * Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server Running : http://localhost:${port}`);
});

export default app;
