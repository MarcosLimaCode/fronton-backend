export function extractImageFromContent(content: any): any | null {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

export function removeLinkFromTitle(title: string): string {
  return title.replace(/https?:\/\/[^\s]+/g, "").trim();
}

export function extractOriginalLink(content: string): string | null {
  const match = content.match(/<a href="([^"]+)">/);
  return match ? match[1] : null;
}

export function truncateTitle(title: string): string {
  const words = title.split(" ");
  if (words.length <= 20) return title;
  return words.slice(0, 12).join(" ") + "... Ler mais";
}

export function formatPubDate(pubDate: string): string {
  const date = new Date(pubDate);
  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} de ${month} às ${hours}:${minutes}`;
}

const CATEGORY_MAP: Record<string, string> = {
  // politica
  política: "politica",
  politica: "politica",
  internacional: "politica",
  brasil: "politica",

  // economia
  economia: "economia",
  finanças: "economia",
  financas: "economia",
  negócios: "economia",
  negocios: "economia",
  consumo: "economia",
  mercados: "economia",
  marketing: "economia",
  mídia: "economia",
  midia: "economia",

  // tecnologia
  tecnologia: "tecnologia",
  "sistemas operacionais": "tecnologia",
  periféricos: "tecnologia",
  perifericos: "tecnologia",
  tablets: "tecnologia",
  internet: "tecnologia",
  ciência: "tecnologia",
  ciencia: "tecnologia",

  // musica
  música: "musica",
  musica: "musica",
  rock: "musica",
  rap: "musica",
  "heavy metal": "musica",

  // cinema
  cinema: "cinema",
  séries: "cinema",
  series: "cinema",
  "notícias - séries de tv": "cinema",

  // futebol
  futebol: "futebol",
  "futebol brasileiro": "futebol",
  "copa do brasil": "futebol",
  "cnn esportes": "futebol",

  // pop
  pop: "pop",
  cultura: "pop",
  entretenimento: "pop",
  celebridades: "pop",
  listas: "pop",
  lançamentos: "pop",
  lancamentos: "pop",
};

export function resolveCategory(itemCategories: string[]): string | null {
  for (const cat of itemCategories) {
    const match = CATEGORY_MAP[cat.toLowerCase()];
    if (match) return match;
  }
  return null;
}