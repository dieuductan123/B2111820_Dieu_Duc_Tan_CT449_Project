const Borrower = require("../models/borrower.model");
const dbHelper = require("../helper/db.helper");

module.exports = {
  purchaseBook: async (body, next) => {
    try {
      const borrower = await dbHelper.create(Borrower, body, next);
      return borrower;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  findPurchaseBookById: async (readerId, bookId, next) => {
    try {
      return await dbHelper.findOne(
        Borrower,
        { readerId, bookId },
        {},
        next
      );
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  findAllPurchasedBooks: async (readerId, next) => {
    try {
      return await dbHelper.findAll(
        Borrower,
        { readerId, active: true },
        { populate: "bookId" },
        next
      );
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  updateBorrowerBook: async (readerId, bookId, body, next) => {
    try {
      return await dbHelper.update(
        Borrower,
        body,
        { readerId, bookId },
        next
      );
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
};
