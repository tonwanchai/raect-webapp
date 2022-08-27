const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FruitSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
    }
  },
  { collection: "fruit" }
);


module.exports = mongoose.model("fruit", FruitSchema);