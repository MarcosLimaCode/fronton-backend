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
  eleicoes: "politica",
  trump: "politica",
  "política internacional": "politica",
  "política brasileira": "politica",
  "política do brasil": "politica",
  "governo do brasil": "politica",
  lula: "politica",
  bolsonaro: "politica",
  luladasilva: "politica",
  congresso: "politica",
  senado: "politica",
  câmara: "politica",
  camara: "politica",
  stf: "politica",
  ministério: "politica",
  ministerio: "politica",
  eleição: "politica",
  eleicao: "politica",
  voto: "politica",
  partido: "politica",
  deputado: "politica",
  senador: "politica",
  presidente: "politica",
  governo: "politica",

  // economia
  economia: "economia",
  finanças: "economia",
  financas: "economia",
  negócios: "economia",
  negocios: "economia",
  consumo: "economia",
  mercados: "economia",
  marketing: "economia",
  bolsa: "economia",
  ibovespa: "economia",
  dólar: "economia",
  dolar: "economia",
  inflação: "economia",
  inflacao: "economia",
  pib: "economia",
  juros: "economia",
  selic: "economia",
  banco: "economia",
  investimento: "economia",
  startup: "economia",
  mercado: "economia",
  empreendedorismo: "economia",

  // tecnologia
  tecnologia: "tecnologia",
  "sistemas operacionais": "tecnologia",
  periféricos: "tecnologia",
  perifericos: "tecnologia",
  tablets: "tecnologia",
  internet: "tecnologia",
  ciência: "tecnologia",
  ciencia: "tecnologia",
  iphone: "tecnologia",
  android: "tecnologia",
  apple: "tecnologia",
  google: "tecnologia",
  microsoft: "tecnologia",
  "inteligência artificial": "tecnologia",
  "inteligencia artificial": "tecnologia",
  ia: "tecnologia",
  app: "tecnologia",
  software: "tecnologia",
  hardware: "tecnologia",
  gadget: "tecnologia",
  "5g": "tecnologia",
  computador: "tecnologia",

  // musica
  música: "musica",
  musica: "musica",
  rock: "musica",
  rap: "musica",
  "heavy metal": "musica",
  álbum: "musica",
  album: "musica",
  show: "musica",
  turnê: "musica",
  turne: "musica",
  banda: "musica",
  cantor: "musica",
  cantora: "musica",
  single: "musica",
  clipe: "musica",
  spotify: "musica",
  grammy: "musica",
  festival: "musica",

  // cinema
  cinema: "cinema",
  séries: "cinema",
  series: "cinema",
  "notícias - séries de tv": "cinema",
  filme: "cinema",
  streaming: "cinema",
  netflix: "cinema",
  disney: "cinema",
  marvel: "cinema",
  dc: "cinema",
  oscar: "cinema",
  série: "cinema",
  serie: "cinema",
  temporada: "cinema",
  trailer: "cinema",
  estreia: "cinema",

  // futebol
  futebol: "futebol",
  "futebol brasileiro": "futebol",
  "copa do brasil": "futebol",
  "cnn esportes": "futebol",
  brasileirão: "futebol",
  brasileirao: "futebol",
  libertadores: "futebol",
  champions: "futebol",
  "premier league": "futebol",
  "la liga": "futebol",
  "serie a": "futebol",
  bundesliga: "futebol",
  gol: "futebol",
  escalação: "futebol",
  escalacao: "futebol",
  técnico: "futebol",
  tecnico: "futebol",
  jogador: "futebol",

  // pop
  pop: "pop",
  cultura: "pop",
  entretenimento: "pop",
  celebridades: "pop",
  listas: "pop",
  lançamentos: "pop",
  lancamentos: "pop",
  celebridade: "pop",
  famoso: "pop",
  famosa: "pop",
  reality: "pop",
  tiktok: "pop",
  instagram: "pop",
  viral: "pop",
  moda: "pop",
  beleza: "pop",
  lifestyle: "pop",
};

export function resolveCategory(itemCategories: string[]): string | null {
  for (const cat of itemCategories) {
    const match = CATEGORY_MAP[cat.toLowerCase()];
    if (match) return match;
  }
  return null;
}