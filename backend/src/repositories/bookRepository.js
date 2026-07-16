import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectToDatabase } from "../config/db.js";
import { isMongoEnabled } from "../utils/dataSource.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.join(__dirname, "..", "data", "library_catalog.json");

function readLocalCatalog() {
  const raw = fs.readFileSync(CATALOG_PATH, "utf-8");
  return JSON.parse(raw);
}

function applyFilters(books, { search, genre, status }) {
  const term = search?.trim().toLowerCase();

  return books.filter((book) => {
    const matchesTerm =
      !term ||
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term);
    const matchesGenre = !genre || genre === "all" || book.genre === genre;
    const matchesStatus = !status || status === "all" || book.availability_status === status;

    return matchesTerm && matchesGenre && matchesStatus;
  });
}

// Busca paginada com os mesmos filtros usados pelo formulário do catálogo:
// termo (título/autor), gênero e disponibilidade.
export async function findBooks({ search = "", genre = "all", status = "all", page = 1, limit = 9 }) {
  const skip = (page - 1) * limit;

  if (isMongoEnabled()) {
    const db = await connectToDatabase();
    const collection = db.collection("books");

    const query = {};
    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ title: regex }, { author: regex }];
    }
    if (genre !== "all") query.genre = genre;
    if (status !== "all") query.availability_status = status;

    const [items, total] = await Promise.all([
      collection.find(query, { projection: { _id: 0 } }).skip(skip).limit(limit).toArray(),
      collection.countDocuments(query),
    ]);

    return { items, total };
  }

  const filtered = applyFilters(readLocalCatalog(), { search, genre, status });
  return { items: filtered.slice(skip, skip + limit), total: filtered.length };
}

export async function findBookByIsbn(isbn) {
  if (isMongoEnabled()) {
    const db = await connectToDatabase();
    return db.collection("books").findOne({ isbn }, { projection: { _id: 0 } });
  }

  const catalog = readLocalCatalog();
  return catalog.find((book) => book.isbn === isbn) || null;
}

export async function getCatalogFilters() {
  if (isMongoEnabled()) {
    const db = await connectToDatabase();
    const collection = db.collection("books");
    const [genres, statuses] = await Promise.all([
      collection.distinct("genre"),
      collection.distinct("availability_status"),
    ]);
    return { genres: genres.sort(), statuses };
  }

  const catalog = readLocalCatalog();
  return {
    genres: [...new Set(catalog.map((book) => book.genre))].sort(),
    statuses: [...new Set(catalog.map((book) => book.availability_status))],
  };
}