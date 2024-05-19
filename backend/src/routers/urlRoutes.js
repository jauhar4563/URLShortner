import express from "express";
import {
  getUrlsController,
  createShortUrlController,
  redirectUrlController,
} from "../controllers/urlController.js";

const router = express.Router();

router.get("/:shortUrl", redirectUrlController);
router.get("/getUrls/:userId", getUrlsController);
router.post("/shortenUrl", createShortUrlController);

export default router;
