import express from "express";
import cookieParser from "cookie-parser";
import { configEnv, configMorgan, configHelmet } from "../config.js";
configEnv();

import connectDB from "./db/configDB.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// * Middlewares
app.use(configHelmet());
app.use(configMorgan());
app.use(express.json());
app.use(cookieParser());

// * Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server Running : http://localhost:${port}`);
});

export default app;
