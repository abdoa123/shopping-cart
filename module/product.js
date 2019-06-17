var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var scheme = new Scheme({
    imgPath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('products',scheme);
