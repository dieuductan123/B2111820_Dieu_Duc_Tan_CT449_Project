const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema(
  {
    readerId: {
      type: String,
      ref: 'docGia',
      required: true,
    },

    amount: {
      type: Number, 
      default: 0,
    },

    paidAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

const Fine = mongoose.model('Fine', fineSchema);
module.exports = Fine;