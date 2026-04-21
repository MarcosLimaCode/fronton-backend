import prisma from "../database/database.js";
import { CreateNewsData } from "../protocols/newsProtocol.js";

export async function createNewsRepository(data: CreateNewsData) {
  const result = await prisma.news.upsert({
    where: { link: data.link },
    update: {},
    create: {
      title: data.title,
      portal: data.portal,
      logo: data.logo,
      imageUrl: data.imageUrl,
      content: data.content,
      link: data.link,
      publishedAt: new Date(data.publishedAt),
    },
  });
  return result;
}

export async function getNewsRepository() {
  const fallbackNews = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
    take: 100,
  });
  return fallbackNews;
}
