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
      default: 200,
    },

    quantity: {
      type: Number,
      required: [true, "Please enter book quantity"],
      default: 100,
    },

    publishYear: {
      type: Number,
    },

    image: {
      type: String,
      required: false,
    },

    publisherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'nhaXuatBan',
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

const Book = mongoose.model("sach", BookSchema);
module.exports = Book;