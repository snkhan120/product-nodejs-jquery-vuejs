
const mongoose = require("mongoose");

const Counter = mongoose.model(
    "counter",
    mongoose.Schema(
      {
        _id: String,
        sequence_value: Number,
      },
    )
  );

  module.exports = Counter;