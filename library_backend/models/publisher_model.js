const mongoose = require("mongoose");

const PublisherSchema = mongoose.Schema(
  {
    publisherId: { 
      type: String, 
      required: [true, "Please enter publisher id"], 
      unique: true 
    },

    name: { 
      type: String, 
      required: [true, "Please enter publisher name"], 
    },

    address: { 
      type: String, 
      required: [true, "Please enter address"], 
    },
  },
  { 
    timestamps: true 
  }
);

const Publisher = mongoose.model("nhaXuatBan", PublisherSchema);
module.exports = Publisher;
