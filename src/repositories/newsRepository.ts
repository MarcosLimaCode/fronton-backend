import prisma from "database/database";
import { CreateNewsData } from "protocols/newsProtocol";

export async function createNewsRepository(data: CreateNewsData) {
  const result = await prisma.news.create({
    data: {
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
  const result = await prisma.news.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });
  return result;
}
