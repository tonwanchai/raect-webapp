let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let FruitSchema = require("../models/fruit");

router.route("/create-fruit").post((req, res, next) => {
  FruitSchema.create(req.body, (error, data) => {
    if (error) {
      return next("error");
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/").get((req, res) => {
  FruitSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/edit-fruit/:id").get((req, res) => {
  FruitSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update-fruit/:id").put((req, res, next) => {
  FruitSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("fruit successfully updated");
      }
    }
  );
});

router.route("/delete-fruit/:id").delete((req, res, next) => {
  FruitSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ msg: data });
    }
  });
});

module.exports = router;
