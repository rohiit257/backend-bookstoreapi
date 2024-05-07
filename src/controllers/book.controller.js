import { Book } from "../models/books.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addBook = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    throw new ApiError(400, "book title,author and publish year required");
  }

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  };
  const book = await Book.create(newBook);

  return res.status(201, "books registered successfully").send(book);
});

const getBooks = asyncHandler(async (_, res) => {
  try {
    const books = await Book.find({});

    return res
      .status(201)
      .json(new ApiResponse(200, books, "books fetched succesfully"));
  } catch (error) {
    throw new ApiError(400, "no books found");
  }
});

const getBookById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, book, "Book fetched successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw ApiError instances
    } else {
      throw new ApiError(400, "Invalid book ID"); // Or handle other errors accordingly
    }
  }
});


const updateBook = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      throw new ApiError(400, "fields required");
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      throw new ApiError(401, "invalid book id");
    }

    return res.status(201).send("book updated successfully");
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      throw new ApiError(401, "book not found");
    }

    return res.status(201).send("book deleted successfully");
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
});

export { addBook, getBooks, updateBook, deleteBook, getBookById};
