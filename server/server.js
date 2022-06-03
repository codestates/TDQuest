const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const https = require("https");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const address = ["https://d2lx9yleo3gz1b.cloudfront.net", "https://tdquest.ml"]
const corsOptions = {
  origin: function(origin, callback){
  const list = address.indexOf(origin) !== -1;
  callback(null, list); 
  },
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/check", (req, res) => {
  res.status(201).send("success");
});


app.use("/", router);
const HTTPS_PORT = 3001;
let server;
server = app.listen(HTTPS_PORT);
console.log(HTTPS_PORT);
module.exports = server;
