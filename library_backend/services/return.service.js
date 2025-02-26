const Return = require("../models/return.model");
const dbHelper = require("../helper/db.helper");

module.exports = {
  returnBook: async (body, next) => {
    try {
      const returned = await dbHelper.create(Return, body, next);
      return returned;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  findReturnBookById: async (userId, bookId, next) => {
    try {
      return await dbHelper.findOne(Return, { userId, bookId }, {}, next);
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
};
