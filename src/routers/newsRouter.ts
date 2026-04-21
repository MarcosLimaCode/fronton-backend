import { createNews, getNews } from "../controllers/newsController.js";
import { Router } from "express";

const router = Router();

router.get("/news", getNews);
router.get("/", getNews);
router.get("/refresh", createNews);

export default router;
