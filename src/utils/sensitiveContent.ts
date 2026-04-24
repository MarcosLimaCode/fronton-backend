const SENSITIVE_WORDS = [
  "acidente",
  "morte",
  "morto",
  "morreu",
  "assassinado",
  "assassinato",
  "crime",
  "baleado",
  "tiro",
  "tragédia",
  "tragedia",
  "desastre",
  "vítima",
  "vitima",
  "sequestro",
  "estupro",
  "abuso",
  "suicídio",
  "suicidio",
  "explosão",
  "explosao",
  "incêndio",
  "incendio",
  "ataque",
  "guerra",
  "bomba",
];

export function isSensitiveContent(title: string, content: string): boolean {
  const text = `${title} ${content}`.toLowerCase();
  return SENSITIVE_WORDS.some((word) => text.includes(word));
}
