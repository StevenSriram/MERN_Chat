import express from "express";

import {
  getUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users/:id", getUsers);

router.get("/get/:from/:to", getMessages);
router.post("/send/:from/:to", sendMessage);

export default router;
