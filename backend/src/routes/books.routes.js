import { Router } from "express";
import { findBooks, findBookByIsbn, getCatalogFilters } from "../repositories/bookRepository.js";

const router = Router();

// GET /api/books?search=&genre=&status=&page=&limit=
router.get("/", async (req, res, next) => {
  try {
    const { search = "", genre = "all", status = "all", page = "1", limit = "9" } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 9;

    const { items, total } = await findBooks({
      search,
      genre,
      status,
      page: pageNumber,
      limit: limitNumber,
    });

    res.json({
      items,
      total,
      page: pageNumber,
      totalPages: Math.max(1, Math.ceil(total / limitNumber)),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/books/filters — valores para os selects de gênero/disponibilidade.
// Precisa vir antes de "/:isbn" para não ser interpretada como um ISBN.
router.get("/filters", async (req, res, next) => {
  try {
    res.json(await getCatalogFilters());
  } catch (error) {
    next(error);
  }
});

// GET /api/books/:isbn
router.get("/:isbn", async (req, res, next) => {
  try {
    const book = await findBookByIsbn(req.params.isbn);
    if (!book) return res.status(404).json({ message: "Livro não encontrado." });
    res.json(book);
  } catch (error) {
    next(error);
  }
});

export default router;