/**
 * Index.js
 * Creates an express app to manage mock response
 */

var express = require('express');
var app = express();

var constants = require('./constants.json');

var call_param = '/',
    port = constants.port,
    delay = 0;

/**
* Allows access to all origin
*/
app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
 
    next();
});
 
/**
 * Returns a JSON service response by fetching the files in ./service folder
 */
app.get('*', function(req, res) {
    try {
        call_param = req.params[0];
        // Delay the response by the the time value
        delay = req.query.delay;

        var timeoutObj = setTimeout(function() {

            // Send file content as response
            res.setHeader('Content-Type', 'application/json');
            res.sendFile(__dirname + '/service' + call_param + '.json', {}, function(err) {
                res.status(404).end(JSON.stringify(constants.ERR.File_Not_Found));
            });
        }, delay);
    } catch (ex) {
        res.status(404).end(ex.message);
    }
});

/**
 * Sucess response for all non GET requests
 */
app.all('*', function(req, res) {
    try {
        // Delay the response by the the time value
        delay = req.query.delay;
        var timeoutObj = setTimeout(function() {
            res.status(200).end(JSON.stringify(constants.SUCCESS));
        }, delay);
    } catch (ex) {
        res.status(404).end(ex.message);
    }
})

// Run the application on the port 
if (app.get('env')) {
    port = process.env.PORT || port;
}

app.listen(port, function() {
    console.log('App Started at port number ' + port);
});
