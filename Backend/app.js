import express from "express";

import { configEnv } from "../config.js";
configEnv();

import connectDB from "./db/configDB.js";

const app = express();
const port = process.env.PORT || 3000;

// * Testing Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server Running : http://localhost:${port}`);
});

export default app;
