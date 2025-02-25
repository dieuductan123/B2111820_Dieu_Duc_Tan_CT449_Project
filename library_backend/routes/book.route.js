const express = require('express');
const apiBooks = require("../controllers/book.controller");

const router = express.Router();

router.route("/")
    .get(apiBooks.getAllBooks)
    .post(apiBooks.addBook)
    .delete(apiBooks.deleteAllBooks);

router.route("/:bookId")
  .get(apiBooks.getBookById)
  .put(apiBooks.updateBook)
  .delete(apiBooks.deleteBook);

module.exports = router;