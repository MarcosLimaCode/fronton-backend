import { Request, Response } from "express";
import {
  createNewsService,
  getNewsService,
  refreshNewsService,
} from "services/newsService";

export async function getNews(req: Request, res: Response) {
  const userId = res.locals.user;
  const create = await refreshNewsService();
  const result = await getNewsService();
  res.status(200).send(result);
  return;
}
