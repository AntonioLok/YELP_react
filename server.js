const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const session = require('express-session');
//const socketIO = require('socket.io')
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');


//use sessions for tracking logins
app.use(session({
  secret: 'tonyro',
  resave: true,
  saveUninitialized: false
}));

// Allow cors
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE, OPTIONS');
          next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//app.use(express.static(path.join(__dirname, '/build')));

// API location
app.use('/api', api);


// Send all other requests to the app
/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build' , 'index.html'));
});
*/

//Set Port
const port = process.env.PORT || '8000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));