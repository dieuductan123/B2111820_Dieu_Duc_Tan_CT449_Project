const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
  readerId: {
    type: String,
    ref: 'docGia',
    required: true,
    unique: true,
  },

  readerId: {
    type: String,
    ref: 'sach',
    required: true
  },

  returnDate: {
    type: Date,
    default: Date.now
  }
  },
  {
    timestamps: true
  }
);

const Return = mongoose.model('Return', returnSchema);
module.exports = Return;