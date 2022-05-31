const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const https = require("https");
const fs = require('fs');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use("/", router);
const HTTPS_PORT = 3001;
let server;
server = app.listen(HTTPS_PORT);
console.log(HTTPS_PORT)
module.exports = server;
