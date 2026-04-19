import { createNews, getNews } from "controllers/newsController";
import { Router } from "express";

const router = Router();

router.get("/news", getNews);
router.get("/refresh", createNews);

export default router;
