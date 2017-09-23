
var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/flatmate', function() {

    // Load Mongoose models 
    seeder.loadModels([
        'models/Room.js',
        'models/Request.js',
        'models/User.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Room', 'Request', 'User'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data, function() {
            //seeder.disconnect(); 
            process.exit()
        });
 
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    {
        'model': 'Room',
        'documents': [
            {

                "roomSize": 30,
                "price": 200,
                "tags": ["fuckyes", "weedyes", "alcoholyes"],
                "userInfo":{
                    "facebookId": "1844650538896345"
                }
            },
            {
                "roomSize": 40,
                "price": 250,
                "tags": ["fuckyes", "weedyes", "alcoholno"],
                "userInfo":{
                    "facebookId": "1844650538896345"
                }
            },
            {
                "roomSize": 33,
                "price": 200,
                "tags": ["caryes", "cellphoneno", "pornyes"],
                "userInfo":{
                    "facebookId": "1844650538896345"
                }
            }
        ],
    },{
        
        'model': 'Request',
        'documents': [
            {

                'roomSize': 30,
                'maxPrice': 200,
                "tags": ["fuckyes","pornyes","weedyes"],
                "userInfo": {
                    "facebookId": "850641068449846"
                }
            },
            {
                'roomSize': 33,
                'maxPrice': 400,
                "tags": ["caryes","cellphoneno","weedyes"],
                "userInfo": {
                    "facebookId": "850641068449846"
                }
            },

        ]

        
    }
];