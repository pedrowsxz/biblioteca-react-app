import { MongoClient } from "mongodb";

// Conexão simples e única (singleton) reaproveitada por toda a aplicação,
// para não abrir uma conexão nova a cada requisição.
let client;
let db;

export async function connectToDatabase() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI não definida no .env (necessária quando DATA_SOURCE=mongodb)."
    );
  }

  // Timeout de seleção de servidor mais curto que o padrão (30s), só para
  // falhar rápido durante o desenvolvimento caso o MongoDB não esteja acessível.
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  db = client.db(process.env.MONGODB_DB_NAME || "biblioteca");
  console.log(`Conectado ao MongoDB (${db.databaseName}).`);

  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
  }
}