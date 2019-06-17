var express = require('express');
var router = express.Router();
var product = require('../module/product')
var UserDB = require('../module/user')
var userconfig = require('../module/userconfig')
var csrf = require('csurf')
var csurfprotection = csrf();
router.use(csurfprotection);

const userobject = new userconfig(UserDB)
/* GET home page. */
router.get('/', function (req, res, next) {
  product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));

    }

    res.render('shop/index', { title: 'welcome', proudcts: productChunks });
  });
});
/*--------------------------------------------------------------- */

/* GET user sign up */



module.exports = router;
