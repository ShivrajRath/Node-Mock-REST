## Node Mock REST App

### Description
This application gives your project easy setup for mock services. It supports lazy response for GET methods

### Pre Requisite
* Node JS

### Starting the app
* Run ``npm start``
* App would run on ``localhost:3333``
* If you want to run on different port run ``PORT=<new_port> npm start``

### How to use
* GET Request
Put your json file inside service folder in same structure as of your request URL
e.g: ``get/project/all`` would be get (folder) / project (folder) / all.json
You don't need to restart the app
* Other Requests
For requests like PUT/POST/DELETE etc you'll allways get a success response
* Delayed Response
Pass a 'delay' parameter to get the request after the supplied ms
e.g ``get/project/all?delay=10000`` will respond after 10ms