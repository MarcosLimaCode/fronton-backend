import {
  createNews,
  getAllNews,
  getNews,
} from "../controllers/newsController.js";
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.send("Ok!");
});

router.get("/news", getNews);
router.get("/", getNews);
router.get("/allnews", getAllNews);
router.get("/refresh", createNews);

export default router;
