const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CartSchema = new Schema({
  name: {
    type: String
  },
});

module.exports = mongoose.model("cart", CartSchema);
