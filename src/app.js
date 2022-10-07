const express = require("express");
const app = express();
const path = require("path");
const winston = require('winston')

// logging
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)

function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')));

app.set("views", path.join(__dirname, "views"));

// db connection
// const db = require("./models/index");

// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch((err) => {
//     console.log("Cannot connect to the database!", err);
//     // process.exit();
//   });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/product/index.html");
});

// routes
require("./routes/product.routes")(app);

module.exports = app;