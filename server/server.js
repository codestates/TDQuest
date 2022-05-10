const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const https = require("https");
const fs = require('fs');
const redis = require('redis');
const session = require('express-session');
// const redisStore = require('connect-redis')(session)
// const redisClient = redis.createClient({
//   host : "127.0.0.1",
//   port : 6379,
//   legacyMode: true
// }); //aws 주소 바꾸기

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "secret",
  saveUninitialized: false,
  resave: false,
  // store: new redisStore({client : redisClient})
}))

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", router);
const HTTPS_PORT = process.env.HTTPS_PORT || 3001;
let server;

// if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log(`Listening on port ${HTTPS_PORT}`));

// } else {
server = app.listen(HTTPS_PORT);

module.exports = server;
