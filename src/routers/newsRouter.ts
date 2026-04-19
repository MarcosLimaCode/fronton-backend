import { getNews } from "controllers/newsController";
import { Router } from "express";

const router = Router();

router.get("/news", getNews);

export default router;
