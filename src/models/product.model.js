
const mongoose = require("mongoose");

const Product = mongoose.model(
    "product",
    mongoose.Schema(
      {
        name: String,
        price: Number,
      },
      { timestamps: true }
    )
  );

  module.exports = Product;