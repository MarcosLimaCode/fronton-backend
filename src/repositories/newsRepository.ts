import prisma from "database/database";
import { CreateNewsData } from "protocols/newsProtocol";

export async function createNewsRepository(data: CreateNewsData) {
  const result = await prisma.news.upsert({
    where: { link: data.link },
    update: {},
    create: {
      title: data.title,
      portal: data.portal,
      imageUrl: data.imageUrl,
      content: data.content,
      link: data.link,
      publishedAt: new Date(),
    },
  });
  return result;
}

export async function getNewsRepository() {
  const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);

  const recentNews = await prisma.news.findMany({
    where: {
      publishedAt: {
        gte: twentyMinutesAgo,
      },
    },
  });

  if (recentNews.length === 0) {
    const fallbackNews = await prisma.news.findMany({
      orderBy: { publishedAt: "desc" },
      take: 20,
    });
    return fallbackNews.sort(() => Math.random() - 0.5).slice(0, 8);
  }

  return recentNews.sort(() => Math.random() - 0.5).slice(0, 8);
}
