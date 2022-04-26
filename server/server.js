const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router')

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
app.listen(80, () => console.log('80번 포트 대기'));