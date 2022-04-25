const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('hello NodeJs');
})
app.listen(80, () => console.log('80번 포트 대기'));