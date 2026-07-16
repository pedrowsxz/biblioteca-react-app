// Popula o MongoDB com o conteúdo de src/data/library_catalog.json.
// Independe de DATA_SOURCE: sempre grava no banco, para permitir preparar
// a coleção antes de alternar a aplicação para DATA_SOURCE=mongodb.
//
// Rodar com: npm run seed

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectToDatabase, closeDatabase } from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.join(__dirname, "..", "data", "library_catalog.json");

async function seed() {
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"));

  if (catalog.length === 0) {
    console.warn("library_catalog.json está vazio — nada para importar.");
    return;
  }

  const db = await connectToDatabase();
  const collection = db.collection("books");

  await collection.deleteMany({});
  const result = await collection.insertMany(catalog);
  await collection.createIndex({ isbn: 1 }, { unique: true });

  console.log(`${result.insertedCount} livros inseridos na coleção "books".`);
}

seed()
  .catch((error) => {
    console.error("Falha ao popular o banco:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabase();
  });