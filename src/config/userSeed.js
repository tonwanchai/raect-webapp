const dotenv = require("dotenv");
const connectDB = require("./mongoDB.js");

var mongoose = require("mongoose"),
  User = require("../models/user"),
  bcrypt = require("bcrypt");
User = mongoose.model("User");

dotenv.config();

connectDB();

const users = [
  {
    fullName: "Admin",
    email: "admin123@admin.com",
    hash_password: bcrypt.hashSync("Admin11@@", 10),
  },
];

const importUsers = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteUsers = async () => {
  try {
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

switch (process.argv[2]) {
  case "-d": {
    deleteUsers();
    break;
  }
  default: {
    importUsers();
  }
}
