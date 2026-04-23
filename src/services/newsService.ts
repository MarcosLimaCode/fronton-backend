import { redis } from "../lib/redis.js";
import { getLinkPreview } from "link-preview-js";
import Parser from "rss-parser";
import { RSS_FEEDS } from "../config/rssFeeds.js";
import {
  createNewsRepository,
  getNewsRepository,
} from "../repositories/newsRepository.js";
import { CreateNewsData, Preview } from "../protocols/newsProtocol.js";
import { extractOriginalLink } from "../utils/extractInfo.js";

const parser = new Parser();

const CACHE_TTL = 60 * 60 * 24;

export async function createNewsService(
  source: {
    portal: string;
    handle: string;
    category: string;
    url: string;
    logo: string;
  },
  maxNews: number
) {
  try {
    const feed = await parser.parseURL(source.url);

    for (const item of feed.items.slice(0, maxNews)) {
      const newLink = extractOriginalLink(item.content || "");
      if (!newLink) continue;

      // Chave única por link
      const cacheKey = `news:${newLink}`;

      // Verifica se já foi processado
      const cached = await redis.get(cacheKey);
      if (cached) continue; // Pula se já existe no cache

      const newData = (await getLinkPreview(newLink, {
        followRedirects: "follow",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        timeout: 5000,
      })) as Preview;

      if (!newData.images[0]) continue;

      const newsObj: CreateNewsData = {
        title: newData.title,
        portal: source.portal,
        logo: source.logo,
        imageUrl: newData.images[0],
        content: newData.description || "",
        link: newData.url as string,
        publishedAt: new Date(item.isoDate ?? item.pubDate ?? Date.now()),
      };

      await createNewsRepository(newsObj);

      // Marca o link como processado no cache
      await redis.set(cacheKey, "1", "EX", CACHE_TTL);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[RSS ERROR] Falha ao processar ${source.portal}:`,
        error.message
      );
    }
  }
  return;
}

export async function refreshNewsService() {
  await Promise.allSettled(
    RSS_FEEDS.map((source) => createNewsService(source, source.limit))
  );

  console.log("--- Refresh de notícias finalizado ---");
  return;
}

export async function getNewsService() {
  const data = await getNewsRepository();
  return data;
}
