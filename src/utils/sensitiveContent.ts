import natural from "natural";

const stemmer = natural.PorterStemmerPt;

const SENSITIVE_STEMS = [
  "acid",
  "mort",
  "mat",
  "assassin",
  "crim",
  "bale",
  "tir",
  "trag",
  "desastr",
  "vitim",
  "sequestr",
  "estupr",
  "abus",
  "suicid",
  "explos",
  "incendi",
  "guerr",
  "bomb",
  "trafic",
  "assalt",
  "atent",
  "terror",
  "violen",
  "delit",
  "conden",
  "pres",
  "pris",
  "deten",
  "batid",
  "esfaque",
  "atropel",
  "engavet",
];

export function isSensitiveContent(title: string): boolean {
  if (!title) return false;
  const titleStems = stemmer.tokenizeAndStem(title);
  return titleStems.some((stem) => SENSITIVE_STEMS.includes(stem));
}
