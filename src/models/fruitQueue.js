const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let FruitQueueSchema = new Schema({
  fruitID: {
    type: String
  },
});

module.exports = mongoose.model("fruitqueue", FruitQueueSchema);
