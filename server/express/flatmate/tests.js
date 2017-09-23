var matching = require('./jobs/matching').matching
//import matching from './jobs/matching'


var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/flatmate', { useMongoClient: true, promiseLibrary: global.Promise });


require("./models/Request");
var Request = mongoose.model("Request");

require("./models/Room");
var Room = mongoose.model("Room");


var test=  function(test) {
	
    
    Request.find(function(err, req) {

		matching(req[1]);

    });    
    
};

test();


