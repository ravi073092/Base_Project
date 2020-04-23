const express = require('express')
const app = express()
const port = 3000

app.use(function (req, res, next){
res.header();
res.header();
next();
});


app.get('/',(req, res) => {
res.send({'text': 'this text was sent to the server'});
});


app.listen(port,() => {
   console.log('Exaple app listining on port ${port} !');
});
    
    