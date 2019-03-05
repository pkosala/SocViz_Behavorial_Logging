// var Behavior = require('../models/event');
// var mongoose = require('mongoose');
//
// mongoose.plugin(schema => { schema.options.usePushEach = true });
// module.exports = {
//     addLog: function(userId, type, dateTime, data, time_taken) {
//         let newBehavior = new Behavior();
//         newBehavior.userId = userId;
//         newBehavior.type = type;
//         newBehavior.dateTime = dateTime;
//         newBehavior.data = data;
//         newBehavior.time_taken = time_taken;
//
//         newBehavior.save(function(err) {
//             if (err)
//                 throw err;
//             return done(null, newUser);
//         });
//     },
// }
// var Behavior = require('../models/event');
// var mongoose = require('mongoose');
//
// mongoose.plugin(schema => { schema.options.usePushEach = true });
// module.exports = {
//     addLog: function(URL, Activity, Tags, UserId, Date) {
//         let newEvent = new Behavior();
//         newEvent.URL = URL;
//         newEvent.Date = Date;
//         newEvent.Activity = Activity;
//         newEvent.Tags = Tags;
//         newEvent.UserId = UserId;
//
//         newEvent.save(function(err) {
//             if (err)
//                 throw err;
//             return done(null, newUser);
//         });
//     },
// }
