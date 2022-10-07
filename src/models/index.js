const DBConfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = DBConfig.url;

db.connect = async () => {
  await db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
};

db.disconnect = () => {
    console.log("DB Disconnect");
    db.mongoose.disconnect();
}

// models
db.product = require("./product.model.js");

module.exports = db;
