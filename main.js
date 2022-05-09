const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const logger = (res,req,next) => {
    console.log('log deneme');
    next();
}

app.use(express.static('public'))
app.use(logger);

app.get('/', (req,res) =>  {
    res.sendFile(path.resolve(__dirname, './temp/index.html'));
    console.log(req.ip);
})

app.listen(port, () => {
    console.log('bağlandı');
})