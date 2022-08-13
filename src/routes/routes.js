let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

const { default: next } = require("next");
let FruitSchema = require("../models/fruit");
let FruitQueueSchema = require("../models/fruitQueue")
let CartSchema = require("../models/cart")

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
  console.log(req)
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

router.route("/queue/create-queue").post((req, res, next) => {
  console.log(res.body)
  FruitQueueSchema.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
      return next("error");
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/queue").get((req, res) => {
  FruitQueueSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/queue/update").post((req, res, next) => {
  let data = req.body
  console.log(req.body)
  data.forEach((d) => {
    if (d['_id']){
      FruitQueueSchema.findByIdAndUpdate(
        d._id,
        {
          $set: d,
        },
        (error, data) => {
          if (error) {
            console.log(error);
            return next(error);
          } else {
            console.log("fruit successfully updated");
          }
        }
      );
    }else{
      FruitQueueSchema.create(d, (error, data) => {
        if (error) {
          return next("error");
        } else {
          console.log(data);
        }
      });
    }
  })
})
// test
router.route("/queue/delete/:id").delete((req, res, next) => {
  FruitQueueSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("Delete Queue successfully")
      res.status(200).json({ msg: data });
    }
  });
})

router.route("/queue/delete-all/").delete((req, res, next) => {
  FruitQueueSchema.deleteMany({}).then(() => console.log("Data deleted")).catch((error) => console.log(error) );
})

router.route("/cart").get((req, res) => {
  console.log("In get Cart route.")
  CartSchema.find((error, data) => {
    console.log("Data :", data)
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
})

router.route("/cart/create").post((req, res, next) => {
  console.log("create cart route.")
  console.log(req.body)
  CartSchema.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
      return next("error");
    } else {
      console.log(data);
      res.json(data);
    }
  })
})

router.route("/cart/delete").delete((req, res, next) => {
  CartSchema.deleteMany({}).then(() => console.log("Data deleted")).catch((error) => console.log(error) )
})

module.exports = router;
