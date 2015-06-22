## Node Mock REST App

### Description
This application gives your project easy setup for mock services.

Blog Post: [Novice Lab](http://novicelab.org/project/stub-services-runner-in-node-js/535/)

### Installation

``npm install node-mock-rest``

### Pre Requisite
* Node JS

### Starting the app
* Run ``npm start``
* App would run on ``localhost:3333``
* If you want to run on different port run ``PORT=<new_port> npm start``

### How to use
* GET

  Put your json file inside service folder in same structure as of your request URL
e.g: ``/profile/1234`` would be service / profile (folder) / 1234.json
You don't need to restart the app


* POST

  Data in request body will be written to the file mentioned in the POST url. For e.g.: ``/profile/1234`` would create a file ``1234.json`` inside ``profile`` folder and write the request body to it. By default, the response would be a success. However, if you need a custom response, create a file ``postresp/1234.json``


* Other Requests
For requests like PUT/DELETE etc you'll allways get a success response

* CORS
It's enabled for all origin. You need to add specific domain to ``res.header('Access-Control-Allow-Origin', '*');`` to control.

### Limitations
* Cannot create authentication scenarios
* Adding or deleting data not possible currently
* Limited to Content-Type ``application/json``
