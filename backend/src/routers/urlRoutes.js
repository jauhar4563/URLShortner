import express from "express";
import {
  getUrlsController,
  createShortUrlController,
  redirectUrlController,
} from "../controllers/urlController.js";

const router = express.Router();

router.get("/getUrls/:userId", getUrlsController);
router.post("/createShortUrl", createShortUrlController);
router.get("/redirectToUrl", redirectUrlController);

export default router;
