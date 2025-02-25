const Book = require('../models/book.model');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.bookId });
    if (!book) {
      return res.status(404).json({ message: "Sach khong ton tai!" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { bookId: req.params.bookId },
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Sach khong ton tai" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

const deleteBook =  async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({
      bookId: req.params.bookId,
    });
    if (!deletedBook) {
      return res.status(404).json({ message: "Sach can xoa khong ton tai!" });
    }
    res.status(200).json({ message: "Delete book successfully!" });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

const deleteAllBooks =  async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json({ message: "All books has deleted!" });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  deleteAllBooks,
}
