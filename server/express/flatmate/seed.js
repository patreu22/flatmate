
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
                },
                "facebookInfo":'{"friends":[{"name":"Adrian Less","id":"1548402911883944"},{"name":"Viktor Adopertor","id":"850641068449846"}],"likes":[{"name":"Rick and Morty Memes","id":"1625295744446000","created_time":"2017-08-30T23:13:46+0000"},{"name":"Daniel Wolfson","id":"1634459196842222","created_time":"2017-08-22T22:43:03+0000"},{"name":"Lovis Trummer Photography","id":"464972590521031","created_time":"2017-08-07T17:43:54+0000"},{"name":"Hack UPC","id":"153580468349353","created_time":"2017-08-06T00:06:26+0000"},{"name":"SXTN","id":"422061757938835","created_time":"2017-07-14T13:07:55+0000"},{"name":"Draußen ists schöner","id":"163187047082200","created_time":"2017-07-13T14:38:05+0000"},{"name":"MIT DIR - Festival","id":"330694977127933","created_time":"2017-07-11T13:06:54+0000"},{"name":"Salwa Houmsi","id":"1275625672493022","created_time":"2017-07-11T08:20:10+0000"},{"name":"Clubcommission Berlin","id":"155068915864","created_time":"2017-06-26T12:28:22+0000"},{"name":"Zugezogenneukölln","id":"539668036421080","created_time":"2017-04-09T07:15:14+0000"},{"name":"The Tasty Grill","id":"1016273921838886","created_time":"2017-04-01T08:07:05+0000"},{"name":"Übermedien","id":"852900748141902","created_time":"2017-03-30T22:21:05+0000"},{"name":"Lukas Stelter / #promoforperformers","id":"404739946534456","created_time":"2017-03-20T13:12:11+0000"},{"name":"Space Shack","id":"1637605789792590","created_time":"2017-03-18T22:34:10+0000"},{"name":"THE HAUS - Berlin Art Bang","id":"1787360478143564","created_time":"2017-03-13T09:34:26+0000"},{"name":"PrintPeter","id":"1739053449669796","created_time":"2016-11-01T12:57:37+0000"},{"name":"Hertha BSC","id":"174184647568","created_time":"2017-02-25T19:46:57+0000"},{"name":"Manuel Möglich","id":"260237160729285","created_time":"2017-02-15T19:06:39+0000"},{"name":"Retropie","id":"508372192698612","created_time":"2017-02-03T18:49:18+0000"},{"name":"Fuchs & Söhne","id":"1398802170379348","created_time":"2017-01-21T12:41:40+0000"},{"name":"Ballout Berlin","id":"721804484627448","created_time":"2017-01-19T22:22:10+0000"},{"name":"Y-Kollektiv","id":"517303605133886","created_time":"2017-01-15T12:54:58+0000"},{"name":"Chips und Joghurt Komedy","id":"929910137102324","created_time":"2017-01-03T08:48:27+0000"},{"name":"Der goldene Aluhut","id":"1465246933737898","created_time":"2016-12-23T13:26:00+0000"},{"name":"Die besten Shopping Rezensionen","id":"229707614132577","created_time":"2016-12-16T11:50:58+0000"}],"profile":{"location":{"id":"111175118906315","name":"Berlin, Germany"},"hometown":{"id":"110576648970349","name":"Paderborn, Germany"},"sports":[{"id":"108110462544365","name":"Fußball"}],"education":[{"school":{"id":"113185918722440","name":"Reismann Gymnasium Paderborn"},"type":"High School","id":"278600145501400"},{"school":{"id":"110163879007045","name":"TU Berlin"},"type":"College","id":"682214468473297"}],"id":"1844650538896345"}}'
            },
            {
                "roomSize": 40,
                "price": 250,
                "tags": ["fuckyes", "weedyes", "alcoholno"],
                "userInfo":{
                    "facebookId": "1844650538896345"
                },
                "facebookInfo":'{"friends":[{"name":"Adrian Less","id":"1548402911883944"},{"name":"Viktor Adopertor","id":"850641068449846"}],"likes":[{"name":"Rick and Morty Memes","id":"1625295744446000","created_time":"2017-08-30T23:13:46+0000"},{"name":"Daniel Wolfson","id":"1634459196842222","created_time":"2017-08-22T22:43:03+0000"},{"name":"Lovis Trummer Photography","id":"464972590521031","created_time":"2017-08-07T17:43:54+0000"},{"name":"Hack UPC","id":"153580468349353","created_time":"2017-08-06T00:06:26+0000"},{"name":"SXTN","id":"422061757938835","created_time":"2017-07-14T13:07:55+0000"},{"name":"Draußen ists schöner","id":"163187047082200","created_time":"2017-07-13T14:38:05+0000"},{"name":"MIT DIR - Festival","id":"330694977127933","created_time":"2017-07-11T13:06:54+0000"},{"name":"Salwa Houmsi","id":"1275625672493022","created_time":"2017-07-11T08:20:10+0000"},{"name":"Clubcommission Berlin","id":"155068915864","created_time":"2017-06-26T12:28:22+0000"},{"name":"Zugezogenneukölln","id":"539668036421080","created_time":"2017-04-09T07:15:14+0000"},{"name":"The Tasty Grill","id":"1016273921838886","created_time":"2017-04-01T08:07:05+0000"},{"name":"Übermedien","id":"852900748141902","created_time":"2017-03-30T22:21:05+0000"},{"name":"Lukas Stelter / #promoforperformers","id":"404739946534456","created_time":"2017-03-20T13:12:11+0000"},{"name":"Space Shack","id":"1637605789792590","created_time":"2017-03-18T22:34:10+0000"},{"name":"THE HAUS - Berlin Art Bang","id":"1787360478143564","created_time":"2017-03-13T09:34:26+0000"},{"name":"PrintPeter","id":"1739053449669796","created_time":"2016-11-01T12:57:37+0000"},{"name":"Hertha BSC","id":"174184647568","created_time":"2017-02-25T19:46:57+0000"},{"name":"Manuel Möglich","id":"260237160729285","created_time":"2017-02-15T19:06:39+0000"},{"name":"Retropie","id":"508372192698612","created_time":"2017-02-03T18:49:18+0000"},{"name":"Fuchs & Söhne","id":"1398802170379348","created_time":"2017-01-21T12:41:40+0000"},{"name":"Ballout Berlin","id":"721804484627448","created_time":"2017-01-19T22:22:10+0000"},{"name":"Y-Kollektiv","id":"517303605133886","created_time":"2017-01-15T12:54:58+0000"},{"name":"Chips und Joghurt Komedy","id":"929910137102324","created_time":"2017-01-03T08:48:27+0000"},{"name":"Der goldene Aluhut","id":"1465246933737898","created_time":"2016-12-23T13:26:00+0000"},{"name":"Die besten Shopping Rezensionen","id":"229707614132577","created_time":"2016-12-16T11:50:58+0000"}],"profile":{"location":{"id":"111175118906315","name":"Berlin, Germany"},"hometown":{"id":"110576648970349","name":"Paderborn, Germany"},"sports":[{"id":"108110462544365","name":"Fußball"}],"education":[{"school":{"id":"113185918722440","name":"Reismann Gymnasium Paderborn"},"type":"High School","id":"278600145501400"},{"school":{"id":"110163879007045","name":"TU Berlin"},"type":"College","id":"682214468473297"}],"id":"1844650538896345"}}'

            },
            {
                "roomSize": 33,
                "price": 200,
                "tags": ["caryes", "cellphoneno", "pornyes"],
                "userInfo":{
                    "facebookId": "1844650538896345"
                },
                "facebookInfo":'{"friends":[{"name":"Adrian Less","id":"1548402911883944"},{"name":"Viktor Adopertor","id":"850641068449846"}],"likes":[{"name":"Rick and Morty Memes","id":"1625295744446000","created_time":"2017-08-30T23:13:46+0000"},{"name":"Daniel Wolfson","id":"1634459196842222","created_time":"2017-08-22T22:43:03+0000"},{"name":"Lovis Trummer Photography","id":"464972590521031","created_time":"2017-08-07T17:43:54+0000"},{"name":"Hack UPC","id":"153580468349353","created_time":"2017-08-06T00:06:26+0000"},{"name":"SXTN","id":"422061757938835","created_time":"2017-07-14T13:07:55+0000"},{"name":"Draußen ists schöner","id":"163187047082200","created_time":"2017-07-13T14:38:05+0000"},{"name":"MIT DIR - Festival","id":"330694977127933","created_time":"2017-07-11T13:06:54+0000"},{"name":"Salwa Houmsi","id":"1275625672493022","created_time":"2017-07-11T08:20:10+0000"},{"name":"Clubcommission Berlin","id":"155068915864","created_time":"2017-06-26T12:28:22+0000"},{"name":"Zugezogenneukölln","id":"539668036421080","created_time":"2017-04-09T07:15:14+0000"},{"name":"The Tasty Grill","id":"1016273921838886","created_time":"2017-04-01T08:07:05+0000"},{"name":"Übermedien","id":"852900748141902","created_time":"2017-03-30T22:21:05+0000"},{"name":"Lukas Stelter / #promoforperformers","id":"404739946534456","created_time":"2017-03-20T13:12:11+0000"},{"name":"Space Shack","id":"1637605789792590","created_time":"2017-03-18T22:34:10+0000"},{"name":"THE HAUS - Berlin Art Bang","id":"1787360478143564","created_time":"2017-03-13T09:34:26+0000"},{"name":"PrintPeter","id":"1739053449669796","created_time":"2016-11-01T12:57:37+0000"},{"name":"Hertha BSC","id":"174184647568","created_time":"2017-02-25T19:46:57+0000"},{"name":"Manuel Möglich","id":"260237160729285","created_time":"2017-02-15T19:06:39+0000"},{"name":"Retropie","id":"508372192698612","created_time":"2017-02-03T18:49:18+0000"},{"name":"Fuchs & Söhne","id":"1398802170379348","created_time":"2017-01-21T12:41:40+0000"},{"name":"Ballout Berlin","id":"721804484627448","created_time":"2017-01-19T22:22:10+0000"},{"name":"Y-Kollektiv","id":"517303605133886","created_time":"2017-01-15T12:54:58+0000"},{"name":"Chips und Joghurt Komedy","id":"929910137102324","created_time":"2017-01-03T08:48:27+0000"},{"name":"Der goldene Aluhut","id":"1465246933737898","created_time":"2016-12-23T13:26:00+0000"},{"name":"Die besten Shopping Rezensionen","id":"229707614132577","created_time":"2016-12-16T11:50:58+0000"}],"profile":{"location":{"id":"111175118906315","name":"Berlin, Germany"},"hometown":{"id":"110576648970349","name":"Paderborn, Germany"},"sports":[{"id":"108110462544365","name":"Fußball"}],"education":[{"school":{"id":"113185918722440","name":"Reismann Gymnasium Paderborn"},"type":"High School","id":"278600145501400"},{"school":{"id":"110163879007045","name":"TU Berlin"},"type":"College","id":"682214468473297"}],"id":"1844650538896345"}}'

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