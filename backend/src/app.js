import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.routes.js";
import eventsRouter from "./routes/events.routes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const frontendDist = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDist));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", dataSource: process.env.DATA_SOURCE || "json" });
});

app.use("/api/books", booksRouter);
app.use("/api/events", eventsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// Tratador de erros simples e único, no fim da cadeia de middlewares.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Erro interno no servidor." });
});

export default app;