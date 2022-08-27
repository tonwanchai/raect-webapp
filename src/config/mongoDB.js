const mongoose = require("mongoose"),
  dbConfig = require("../database/db");
mongoose.Promise = global.Promise;

const connectDB = async () => {
  mongoose
    .connect(dbConfig.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log("database successfully connected");
      },
      (error) => {
        console.log("Could not connect to database:" + error);
      }
    );
};

module.exports = connectDB;
