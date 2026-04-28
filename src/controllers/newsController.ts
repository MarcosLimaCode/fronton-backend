import { Request, Response } from "express";
import {
  getAllNewsService,
  getNewsService,
  refreshNewsService,
} from "../services/newsService.js";

export async function getNews(req: Request, res: Response) {
  const result = await getNewsService();
  res.status(200).send(result);
  return result;
}

export async function createNews(req: Request, res: Response) {
  const result = await refreshNewsService();
  res.status(200).send("Notícias atualizadas com sucesso!");
  return result;
}

export async function getAllNews(req: Request, res: Response) {
  const result = await getAllNewsService();
  res.status(200).send(result);
  return result;
}