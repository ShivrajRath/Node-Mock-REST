/*jshint node: true*/

/**
 * Index.js
 * Creates an express app to manage mock response
 */

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser');

// Creates express app
var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json 
app.use(bodyParser.json());

// Constants for the application
var constants = require('./constants.json');

var call_param = '/',
  port = constants.port;

/**
 * Allows access to all origin
 */
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Uncomment to allow with credentials. You'd need to give specific origin in that case
  //res.header('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Returns a JSON service response by fetching the files in ./service folder
 */
app.get('*', function (req, res) {
  try {
    call_param = req.params[0];
    // Send file content as response
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + '/service' + call_param + '.json', {}, function (err) {
      res.status(404).end(JSON.stringify(constants.ERR.File_Not_Found));
    });
  } catch (ex) {
    res.status(404).end(ex.message);
  }
});

/**
 * POST creates a file at the location, with the request body and returns response from postresp folder
 */
app.post('*', function (req, res) {
  var path, respPath, x, y;
  try {
    call_param = req.params[0];

    path = __dirname + '/service' + call_param + '.json';

    /** finds the response path*/
    x = call_param.split('/');
    x[x.length - 1] = 'postresp/' + x[x.length - 1];
    respPath = __dirname + '/service' + x.join('/') + '.json';

    // Writes the request body to the file
    fs.writeFile(path, JSON.stringify(req.body), function (err) {
      if (err) {
        // NodeJS can create a file, it needs the directory to be present
        if (err.code === 'ENOENT') {
          res.status(500).end(JSON.stringify(constants.ERR.ENOENT));
        } else {
          res.status(500).end(err.toString());
        }
      } else {
        fs.exists(respPath, function (exists) {
          if (exists) {
            // If response path exists, send file as response
            res.sendFile(respPath, {}, function (err) {
              res.status(404).end(JSON.stringify(constants.ERR.File_Not_Found));
            });
          } else {
            // If reponse path doesn't exists, send success response
            res.status(200).end(JSON.stringify(constants.SUCCESS));
          }
        });
      }
    });
  } catch (ex) {
    res.status(404).end(ex.message);
  }
});

/**
 * Sucess response for all non GET requests
 */
app.all('*', function (req, res) {
  try {
    res.status(200).end(JSON.stringify(constants.SUCCESS));
  } catch (ex) {
    res.status(404).end(ex.message);
  }
});

// Run the application on the port 
if (app.get('env')) {
  port = process.env.PORT || port;
}

// Starts the app
app.listen(port, function () {
  console.log('App Started at port number ' + port);
});