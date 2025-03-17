import { app, server } from "./socket/index.js";

import { configEnv, configMorgan, configHelmet } from "../config.js";
configEnv();

import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/configDB.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

const port = process.env.PORT || 3000;

// * Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(configHelmet());
app.use(configMorgan());
app.use(express.json());
app.use(cookieParser());

// * Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

server.listen(port, () => {
  connectDB();
  console.log(`Server Running : http://localhost:${port}`);
});

export default app;
