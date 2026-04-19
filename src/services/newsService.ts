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
  try {
    const response = await fetch(source.url);
    const rawBody = await response.text();
    const cleanXml = rawBody.substring(rawBody.indexOf("<")).trim();

    // 3. Agora usamos parseString em vez de parseURL
    const feed = await parser.parseString(cleanXml);

    for (const item of feed.items) {
      let imageUrl =
        extractImageFromContent(
          item["content:encoded"] || item.content || ""
        ) ||
        item.enclosure?.url ||
        item.image?.url ||
        "";

      if (!imageUrl || !item.title || !item.content || !item.link) continue;
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
  } catch (error) {
    console.error(
      `[RSS ERROR] Falha ao processar ${source.portal}:`,
      error.message
    );
  }
  return;
}

export async function refreshNewsService() {
  await Promise.allSettled(
    RSS_FEEDS.map((source) => createNewsService(source))
  );

  console.log("--- Refresh de notícias finalizado ---");
  return;
}

export async function getNewsService() {
  const data = await getNewsRepository();
  return data;
}



