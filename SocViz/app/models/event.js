var mongoose = require('mongoose');

mongoose.plugin(schema => { schema.options.usePushEach = true });
var eventSchema = mongoose.Schema({
    URL: String,
    Date: String,
    Activity: String,
    Tags: [String],
    UserId: String,
    Description: String,
    Coordinates: {
        type: Array
    }
},{ collection: 'Event' });
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;