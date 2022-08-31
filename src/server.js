let express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db"),
  User = require('../src/models/user'),
  FruitQueue = require('../src/models/fruitQueue'),
  jsonwebtoken = require('jsonwebtoken');
const http = require("http");
const path = require('path')
const fruitRoute = require("./routes/routes");
require('dotenv').config()
const socketIo = require("socket.io");
const port = process.env.PORT || 5000
const app = express();
const serverr = http.createServer(app);


const io = socketIo(serverr, {
  cors: {
    origin: "http://localhost:3000"
  }
  
});

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

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true }));
app.use(cors());
 
if (process.env.NODE_ENV) {
  app.use(express.static(path.join(__dirname.replace('src/',''),"build"))) 
  app.get("*",(req,res) => { 
      const index = path.join(__dirname, 'build', 'index.html');
      let getPath = index.replace('src\\','')
      res.sendFile(getPath) 
  })
}

app.use(function(req, res, next) {
  console.log("header = ", req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      console.log(decode)
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

app.use("/fruit", fruitRoute);
var routes = require('../src/routes/userRoutes');
routes(app);


// const server = app.listen(port, () => {
//   console.log(`Server is running in port ${port}`);
// });

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 3000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  
  });
});

const getApiAndEmit = socket => {
  let fruitQueueData;
  FruitQueue.find({},function (err, data){
    if(err) console.log(err)
    else return socket.emit("FromAPI", data);
  })
  // console.log(response)
  // Emitting a new message. Will be consumed by the client
  // socket.emit("FromAPI", fruitQueueData);
};

serverr.listen(port, () => console.log(`Listening on port ${port}`));

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;