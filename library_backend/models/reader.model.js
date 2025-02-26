const mongoose = require("mongoose");

const readerSchema = mongoose.Schema({
  readerId: {
    type: String,
    required: [true, "Please enter reader id"],
    unique: true,
  },

  firstName: {
    type: String,
    required: [true, "Please enter reader first name"],
  },

  lastName: {
    type: String,
    required: [true, "Please enter reader last name"],
  },

  birthDate: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },

  address: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },
});

const Reader = mongoose.model("docGia", readerSchema);
module.exports = Reader;
