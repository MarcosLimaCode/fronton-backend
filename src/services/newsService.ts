import Parser from "rss-parser";
import { RSS_FEEDS } from "../config/rssFeeds";
import {
  createNewsRepository,
  getNewsRepository,
} from "repositories/newsRepository";
import { CreateNewsData } from "protocols/newsProtocol";
import {
  extractImageFromContent,
  extractOriginalLink,
  formatPubDate,
  removeLinkFromTitle,
  truncateTitle,
} from "../utils/extractInfo";

const parser = new Parser();

export async function createNewsService(source: {
  portal: string;
  handle: string;
  category: string;
  url: string;
  logo: string;
}) {
  try {
    const feed = await parser.parseURL(source.url);

    for (const item of feed.items) {
      let newLink = extractOriginalLink(item.content || "");
      let imageUrl = extractImageFromContent(item.content || "");
      let removeLink = removeLinkFromTitle(item.title || "");
      let newTitle = truncateTitle(removeLink || "");

      if (!imageUrl || !newLink) continue;
      if (newTitle.includes("#")) continue;

      const newsObj: CreateNewsData = {
        title: newTitle,
        portal: source.portal,
        logo: source.logo,
        imageUrl: imageUrl,
        content: item.title,
        link: newLink,
        publishedAt: new Date(item.isoDate ?? item.pubDate ?? Date.now()),
      };

      await createNewsRepository(newsObj);
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
    RSS_FEEDS.map((source) => createNewsService(source))
  );

  console.log("--- Refresh de notícias finalizado ---");
  return;
}

export async function getNewsService() {
  const data = await getNewsRepository();
  return data;
}



