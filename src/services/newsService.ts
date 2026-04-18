import Parser from "rss-parser";

const parser = new Parser();

async function testFeed() {
  const feed = await parser.parseURL("https://g1.globo.com/rss/g1/");

  console.log("Portal:", feed.title);
  console.log("Total de notícias:", feed.items.length);
  console.log("Primeira notícia:", feed.items[50]);
}

testFeed();
