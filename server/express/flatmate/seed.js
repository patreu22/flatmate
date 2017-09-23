
var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/flatmate', function() {

    // Load Mongoose models 
    seeder.loadModels([
        'models/Room.js',
        'models/Request.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Room', 'Request'], function() {
 
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
                'size': 20,
                'prize': 400,
                'facebookId':1548402911883944
            },
            {
                'size': 20,
                'prize': 400,
                'facebookId':1548402911883944

            }
        ],
    },{
        
        'model': 'Request',
        'documents': [
            {
                'size': 30,
                'maxPrize': 200,
                'facebookId': 422204231293534
            },
            {
                'size': 20,
                'maxPrize': 400,
                'facebookId': 422204231293534

            }
        ]

        
    }
];