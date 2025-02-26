const Fine = require("../models/fine.model");
const dbHelper  = require("../helper/db.helper");

module.exports = {
  createFine: async (body, next) => {
    try {
      if (!body.readerId) {
        throw new Error("readerId is required.");
      }

      // Đảm bảo readerId là String
      body.readerId = String(body.readerId);

      const fine = await dbHelper.create(fineModel, body, next);
      return fine;
    } catch (e) {
      console.error("createFine Error:", e.toString());
      next(e);
    }
  },
};
