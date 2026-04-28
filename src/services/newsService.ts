import { isSensitiveContent } from "../utils/sensitiveContent.js";
import { resolveCategory } from "../utils/extractInfo.js";
import Parser from "rss-parser";
import { RSS_FEEDS } from "../config/rssFeeds.js";
import {
  createNewsRepository,
  findLinksByPortalRepository,
  getAllNewsRepository,
  getNewsRepository,
} from "../repositories/newsRepository.js";
import { CreateNewsData } from "../protocols/newsProtocol.js";
import {
  extractImageFromContent,
  extractOriginalLink,
} from "../utils/extractInfo.js";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

export async function createNewsService(
  source: {
    placeholder: any;
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
    console.log(`[RSS OK] ${source.portal} - ${feed.items.length} itens`);
    const existingLinks = await findLinksByPortalRepository(source.portal);
    const existingSet = new Set(existingLinks.map((n) => n.link));

    for (const item of feed.items.slice(0, maxNews)) {
      const newLink = item.link || extractOriginalLink(item.content || "");
      if (!newLink) continue;
      let imageUrl = extractImageFromContent(
        item["content:encoded"] || item.content || ""
      );

      if (source.portal === "G1" && newLink.includes("ao-vivo")) {
        continue;
      }

      if (source.portal === "G1" && newLink.includes("/videos")) {
        continue;
      }

      if (source.portal === "CNN Brasil") {
        imageUrl = source.placeholder;
      }

      if (!imageUrl || !item.title) continue;
      if (existingSet.has(newLink)) continue;

      const sensitive = isSensitiveContent(
        item.title || item.contentSnippet || ""
      );
      const category = sensitive
        ? "conteudoSensivel"
        : resolveCategory(item.categories || []);

      const newsObj: CreateNewsData = {
        title: item.title || "",
        portal: source.portal,
        logo: source.logo,
        imageUrl: imageUrl,
        content: "",
        link: newLink,
        category: category || "Not Found",
        publishedAt: new Date(item.isoDate ?? item.pubDate ?? Date.now()),
      };

      await createNewsRepository(newsObj);
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

export async function getAllNewsService() {
  const data = await getAllNewsRepository();
  return data;
}
