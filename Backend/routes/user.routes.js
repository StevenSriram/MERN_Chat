import express from "express";
import { upload } from "../utils/cloudinary.js";

import { getChatUsers, uploadProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/chat/:id", getChatUsers);
router.post("/upload/:id", upload.single("imageFile"), uploadProfile);

export default router;
