import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.routes.js";
import eventsRouter from "./routes/events.routes.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", dataSource: process.env.DATA_SOURCE || "json" });
});

app.use("/api/books", booksRouter);
app.use("/api/events", eventsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

// Tratador de erros simples e único, no fim da cadeia de middlewares.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Erro interno no servidor." });
});

export default app;