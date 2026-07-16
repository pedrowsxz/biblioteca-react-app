import { Router } from "express";
import { findEvents, findEventById } from "../repositories/eventRepository.js";

const router = Router();

// GET /api/events
router.get("/", async (req, res, next) => {
  try {
    res.json(await findEvents());
  } catch (error) {
    next(error);
  }
});

// GET /api/events/:id
router.get("/:id", async (req, res, next) => {
  try {
    const event = await findEventById(req.params.id);
    if (!event) return res.status(404).json({ message: "Evento não encontrado." });
    res.json(event);
  } catch (error) {
    next(error);
  }
});

export default router;