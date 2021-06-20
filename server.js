const path = require('path');
const config = require("./configuration_settings")
const bodyParser = require('body-parser');
const express = require('express');
const server = express();


server.use(express.static(path.join(__dirname, 'public')));


server.listen(config.port, function (){
    console.log("listening on port", config.port)
});
