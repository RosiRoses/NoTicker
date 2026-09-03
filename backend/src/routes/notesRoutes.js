import express from "express";
import { createNote, getNoteById, deleteNote, getAllNotes, updateNote, togglePinNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

router.patch("/:id/pin", togglePinNote);

export default router;