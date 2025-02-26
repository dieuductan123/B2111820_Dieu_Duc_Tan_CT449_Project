const mongoose = require("mongoose");

const  borrowSchema = new mongoose.Schema(
  {
    readerId: {
      type: String,
      ref: "docGia",
      required: true,
    },
    bookId: {
      type: String,
      ref: "sach",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    }
    //active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Borrower = mongoose.model("theoDoiMuonSach", borrowSchema);
module.exports = Borrower;
