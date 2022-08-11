const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FruitSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  { collection: "fruit" }
);

// let FruitQueueSchema = new Schema(
//   {
//     fruitID: {
//       type: String
//     }
//   }
// )
module.exports = mongoose.model("fruit", FruitSchema);
// module.exports = mongoose.model("fruitqueue", FruitQueueSchema);