import Parser from "rss-parser";

// Interface para tipar o retorno (opcional, mas boa prática)
interface JogoRSS {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
}

const parser: Parser<any, JogoRSS> = new Parser();

async function buscarProximosJogos(url: string) {
  try {
    const feed = await parser.parseURL(url);

    console.log(`--- ${feed.title} ---`);

    feed.items.forEach((item) => {
      console.log("-----------------------------------------");
      console.log(`Jogo: ${item.title}`);
      console.log(`Link: ${item.link}`);
      console.log(`Data/Info: ${item.contentSnippet}`);
      console.log(item);
    });
  } catch (error) {
    console.error("Erro ao buscar o RSS:", error);
  }
}

// Execução
const RSS_OGOL = "https://www.ogol.com.br/rss/proxjogos.php";
buscarProximosJogos(RSS_OGOL);
