## Node Mock REST App

### Description
This application gives your project easy setup for mock services. It can be run as a standalone NodeJS server to serve stub responses.
If you already have an express app running, you can include this module and invoke startMock function to start the stub services.

Blog Post: [Novice Lab](http://novicelab.org/project/stub-services-runner-in-node-js/535/)

### Installation

``npm install node-mock-rest``

### Pre Requisite
* Node JS

### Starting the standalone app
* Run ``npm start``
* App would run on ``localhost:6174``
* If you want to run on different port run ``PORT=<new_port> npm start``

### Adding to your Express App
var nodeMock = require('node-mock-rest');
nodeMock.startMock(config, app);

config - JSON object for the application config. It can be used to specify the path (relative to node process) of the stub service directory present in your express app.
e.g. config = {stub_dir: 'stubs'}
app - Express app instance.

### How to use
* GET

  Put your json file inside service folder in same structure as of your request URL
e.g: ``stubService/profile/1234`` would be service / stubService / profile (folder) / 1234.json
You don't need to restart the app


* POST

  Data in request body will be written to the file mentioned in the POST url. For e.g.: ``stubService/profile/1234`` would create a file ``1234.json`` inside ``profile`` folder and write the request body to it. By default, the response would be a success. However, if you need a custom response, create a file ``postresp/1234.json``


* Other Requests
For requests like PUT/DELETE etc you'll allways get a success response

* CORS
It's enabled for all origin. You need to add specific domain to ``res.header('Access-Control-Allow-Origin', '*');`` to control.

### Limitations
* Cannot create authentication scenarios
* Adding or deleting data not possible currently
* Limited to Content-Type ``application/json``
