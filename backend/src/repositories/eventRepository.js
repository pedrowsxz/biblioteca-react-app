import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectToDatabase } from "../config/db.js";
import { isMongoEnabled } from "../utils/dataSource.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EVENTS_PATH = path.join(__dirname, "..", "data", "events.json");

function readLocalEvents() {
  const raw = fs.readFileSync(EVENTS_PATH, "utf-8");
  return JSON.parse(raw);
}

// Lista simples: a página de eventos não pede busca/paginação, então,
// ao contrário do catálogo, aqui não há filtros nem recorte por página.
export async function findEvents() {
  if (isMongoEnabled()) {
    const db = await connectToDatabase();
    return db.collection("events").find({}, { projection: { _id: 0 } }).sort({ date: 1 }).toArray();
  }

  return readLocalEvents().sort((a, b) =>
  `${a.month}${a.day}`.localeCompare(`${b.month}${b.day}`)
);
}

export async function findEventById(id) {
  if (isMongoEnabled()) {
    const db = await connectToDatabase();
    return db.collection("events").findOne({ id }, { projection: { _id: 0 } });
  }

  return readLocalEvents().find((event) => event.id === id) || null;
}