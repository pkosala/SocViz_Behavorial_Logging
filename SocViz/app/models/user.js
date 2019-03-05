var mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    loginHistory: {
        type: Array
    }
},{ collection: 'User' });

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
