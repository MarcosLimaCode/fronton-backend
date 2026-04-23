import { getLinkPreview } from "link-preview-js";

export async function createNewsService() {
  try {
    const data = await getLinkPreview(
      "https://ge.globo.com/rj/futebol/copa-do-brasil/jogo/22-04-2026/flamengo-vitoria.ghtml"
    );

    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[RSS ERROR] Falha ao processar`, error.message);
    }
  }
  return;
}

createNewsService();
