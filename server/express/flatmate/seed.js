 
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
                'prize': 400
            },
            {
                'size': 20,
                'prize': 400
            }
        ],
        'model': 'Request',
        'documents': [
            {
                'size': 30,
                'max_prize': 200
            },
            {
                'size': 20,
                'max_prize': 400
            }
        ]
    }
];