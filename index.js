/*jshint node: true*/

/**
 * Index.js
 * Creates an express app to manage mock response
 */

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser');

var defaultConfig = require('./config');
var constants = require('./constants.json');
var _ = require('lodash');

module.exports = function(config, app){
    if (!app) {
      // merge the config with the default config
      config = _.merge(defaultConfig, config);
      console.log(config);
      createApp(config);
    }
}

function addGETStubs(config, app) {
  app.get('*', function (req, res) {
    try {
      var call_param = req.params[0];
      // Send file content as response
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(__dirname + config.stub_dir + call_param + '.json', {}, function (err) {
      res.status(404).end(JSON.stringify(constants.ERR.File_Not_Found));
      });
    } catch (ex) {
      res.status(404).end(ex.message);
    }
  });
}

function addPOSTStubs(app) {
  app.post('*', function (req, res) {
  var path, respPath, x, y;
  try {
    var call_param = req.params[0];

    path = __dirname + config.stub_dir + call_param + '.json';

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
}

function createApp(config) {

  // Creates express app
var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json 
app.use(bodyParser.json());

/**
 * Allows access to all origin
 */
app.all("*", function (req, res, next) {

  // Specify the origin if you want to control the CORS origin
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Uncomment to allow with credentials. You'd need to give specific origin in that case
  //res.header('Access-Control-Allow-Credentials', true);
  next();
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
var port = config.server_port;
if (app.get('env')) {
  port = process.env.PORT || config.server_port;
}

// Starts the app
app.listen(port, function () {
  console.log('App Started at port number ' + port);
});

}

