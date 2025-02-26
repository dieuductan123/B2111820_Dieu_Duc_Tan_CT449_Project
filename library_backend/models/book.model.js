const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
  {
    bookId: {
      type: String,
      required: [true, "Please enter book ID"],
      unique: true,
    },

    title: {
      type: String,
      required: [true, "Please enter book title"],
    },

    price: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      required: [true, "Please enter book quantity"],
      default: 0,
    },

    publishYear: {
      type: Number,
    },

    image: {
      type: String,
      required: false,
    },

    publisherId: {
      type: String,
      ref: "nhaXuatBan",
      required: true,
    },

    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Sach", BookSchema);
module.exports = Book;