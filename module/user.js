var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var scheme = new Scheme({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
});
module.exports = mongoose.model('user',scheme);
