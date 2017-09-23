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
    	var facebook_token = 'EAAYrGhhGgZAoBAMLWBtqE5HfzWOUEkx8Kwg5AJhZAxmRFf1LOZBOcZCG17Jtb6kYzZCDZAEoZCRLiTxu9MOqy7ZAAZCBTEVm8GZBJBSxQCyZAt1cg2icus4HHWcwpmHPUSqJm4crfxcTOIfagb8rdo2CBjvoPZAPLYpbDTsa7yS4WvZCgwLNWZAZBQ3lYKtGRjZCUt9k5SS313TyFkECHZAAbpQHzV6VPxZC3uCiD9JzBOjc7efxOBCwZDZD'
		matching(req[1],facebook_token);
		//EAAYrGhhGgZAoBAMLWBtqE5HfzWOUEkx8Kwg5AJhZAxmRFf1LOZBOcZCG17Jtb6kYzZCDZAEoZCRLiTxu9MOqy7ZAAZCBTEVm8GZBJBSxQCyZAt1cg2icus4HHWcwpmHPUSqJm4crfxcTOIfagb8rdo2CBjvoPZAPLYpbDTsa7yS4WvZCgwLNWZAZBQ3lYKtGRjZCUt9k5SS313TyFkECHZAAbpQHzV6VPxZC3uCiD9JzBOjc7efxOBCwZDZD
    	//EAAYrGhhGgZAoBAJnoUh1DbsUmrHir9ZA3cLzvnacsTm0GVC82zqEqIVv51HcgYmWzxWHkkfZB7wbKueMneUxtHxJSecj4gWOkSZBl0PWC1mM9ubSYAxTKZB4WPDLOwEgluDstZAI6RwjYOkuSKMAoPR7Pgx3oi8cR6oCOHkPwv42E7uAI1MQEZCJlJC28p6PG6ZCQ9e0Y9qOXPsbuTZAMCYAaXMoC5do6M4EH7LLhU5TAu3JRuLpRy2eO
    });  


    
};

test();


