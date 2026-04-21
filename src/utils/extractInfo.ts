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
  if (words.length <= 15) return title;
  return words.slice(0, 12).join(" ") + "...";
}

export function formatPubDate(pubDate: string): string {
  const date = new Date(pubDate);
  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} de ${month} às ${hours}:${minutes}`;
}
