import { Request, Response } from "express";
import { getNewsService, refreshNewsService } from "services/newsService";

export async function getNews(req: Request, res: Response) {
  const result = await getNewsService();
  res.status(200).send(result);
  return result;
}

export async function createNews(req: Request, res: Response) {
  const result = await refreshNewsService();
  res.status(200).send(result);
  return result;
}
