let express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db"),
  User = require('../src/models/user'),
  jsonwebtoken = require('jsonwebtoken')
const fruitRoute = require("./routes/routes");
require('dotenv').config()
const port = process.env.PORT || 5000
mongoose.Promise = global.Promise;

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

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true }));
app.use(cors());
app.use("/fruit", fruitRoute);

app.use(function(req, res, next) {
  console.log("header = ", req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// app.use(function(req, res) {
//   res.status(404).send({ url: req.originalUrl + ' not found' })
// });

var routes = require('../src/routes/userRoutes');
routes(app);


const server = app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});



app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;