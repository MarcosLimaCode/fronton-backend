import Parser from "rss-parser";
import { RSS_FEEDS } from "../config/rssFeeds";
import {
  createNewsRepository,
  getNewsRepository,
} from "repositories/newsRepository";
import { CreateNewsData } from "protocols/newsProtocol";
import { extractImageFromContent } from "../utils/extractImage";

const parser = new Parser();

export async function createNewsService(source: {
  url: string;
  portal: string;
}) {
  const feed = await parser.parseURL(source.url);

  for (const item of feed.items) {
    let imageUrl =
      extractImageFromContent(item["content:encoded"] || item.content || "") ||
      item.enclosure?.url ||
      item.image?.url ||
      "";
    if (!imageUrl) continue;
    if (imageUrl.includes("emoji")) continue;

    const newsObj: CreateNewsData = {
      title: item.title,
      portal: source.portal,
      imageUrl: imageUrl,
      content: item.content,
      link: item.link,
      publishedAt: new Date(item.pubDate ?? Date.now()),
    };
    await createNewsRepository(newsObj);
  }
  return;
}

export async function refreshNewsService() {
  await Promise.all(
    RSS_FEEDS.map((source) => {
      createNewsService(source);
    })
  );
  return;
}

export async function getNewsService() {
  const data = await getNewsRepository();
  return data;
}



