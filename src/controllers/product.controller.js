const db = require("../models");

const Product = db.product;

// Create and Save a new Product
exports.create = async (req, res) => {
  await db.connect();
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Product name can not be empty!" });
    return;
  }

  if (!req.body.price) {
    res.status(400).send({ message: "Product price can not be empty!" });
    return;
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  // Save Product in the database
  product
    .save(product)
    .then((data) => {
      db.disconnect();
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  await db.connect();
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Product.find(condition)
    .then((data) => {
      db.disconnect();
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  await db.connect();
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Product was not found!`,
        });
      } else {
        db.disconnect();
        res.send({
          message: "Product has been deleted successfully!",
        });
      }
    })
    .catch((err) => {
      db.disconnect();
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  await db.connect();
  if (!req.body.name) {
    res.status(400).send({ message: "Product name can not be empty!" });
    return;
  }

  if (!req.body.price) {
    res.status(400).send({ message: "Product price can not be empty!" });
    return;
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      console.log(req.body);
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}.`,
        });
      } else {
          db.disconnect();
          res.send({ message: "Product has been updated successfully." });
      } 
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};
