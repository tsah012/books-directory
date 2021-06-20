const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const port = 3000;
const server = express();
server.use(express.static(path.join(__dirname, 'public')));


server.listen(port, function (){
    console.log("listening on port", port)
});
