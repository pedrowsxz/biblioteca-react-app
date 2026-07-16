// Pipeline de importação do catálogo:
//   1. busca livros na Open Library
//   2. transforma cada item no modelo interno da aplicação
//   3. exporta o resultado para src/data/library_catalog.json
//
// Rodar com: npm run fetch:catalog

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transformDoc } from "./transformBook.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "data", "library_catalog.json");

// Mesma URL do enunciado, acrescida do parâmetro `fields`: por padrão a
// Open Library só devolve um conjunto mínimo de campos, sem isbn, subject,
// publisher, language ou number_of_pages_median — que são necessários
// para montar o modelo interno. Pedir os campos explicitamente evita
// registros incompletos.
const OPEN_LIBRARY_URL =
  "https://openlibrary.org/search.json" +
  "?subject=Brazilian+literature" +
  "&limit=1000" +
  "&fields=key,title,author_name,first_publish_year,number_of_pages_median,subject,isbn,publisher,language,cover_i,cover_edition_key";

async function fetchCatalog() {
  console.log("Buscando livros na Open Library...");

  const response = await fetch(OPEN_LIBRARY_URL);
  if (!response.ok) {
    throw new Error(`Open Library respondeu com status ${response.status}`);
  }

  const { docs = [] } = await response.json();
  console.log(`${docs.length} registros recebidos da API.`);

  const seenIsbns = new Set();
  const catalog = [];

  for (const doc of docs) {
    const book = transformDoc(doc);
    if (!book) continue; // faltam dados obrigatórios (título/autor/identificador)
    if (seenIsbns.has(book.isbn)) continue; // evita duplicados entre edições
    seenIsbns.add(book.isbn);
    catalog.push(book);
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf-8");

  console.log(`Catálogo salvo em ${OUTPUT_PATH} (${catalog.length} livros).`);
}

fetchCatalog().catch((error) => {
  console.error("Falha ao importar catálogo:", error.message);
  process.exit(1);
});