const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router')
const https = require("https");
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:80"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use('/', router)

app.get('/', function(req, res){
    res.send('hello NodeJs');
})
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`Listening on port ${HTTPS_PORT}`));

} else {
server = app.listen(HTTPS_PORT)
console.log(`Listening on port ${HTTPS_PORT}`)
}
module.exports = server;