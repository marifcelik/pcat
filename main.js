const express = require('express');
const app = express();
const port = 3000;

const logger = (res,req,next) => {
    console.log('log deneme');
    next();
}

app.use(logger);

app.get('/', (req,res) =>  {
    res.send('deneme')
    console.log(req.url);
})

app.listen(port, () => {
    console.log('bağlandı');
})