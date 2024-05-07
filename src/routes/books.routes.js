import express from "express";
import {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  getBookById,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/books", addBook);

router.get("/getbooks", getBooks);
router.get("/getbook/:id", getBookById);



router.put("/updatebook/:id", updateBook);

router.delete("/deletebook/:id", deleteBook);

export default router;
