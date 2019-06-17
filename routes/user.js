var express = require('express');
var router = express.Router();
var UserDB = require('../module/user')
var userconfig = require('../module/userconfig')
var csrf = require('csurf')
var csurfprotection = csrf();
router.use(csurfprotection);

/* GET user sign up */
router.get('/user/signup', function (req, res, next) {

    res.render('user/signup', { csrfToken: req.csrfToken() })
  
  })
  /* POST user siGn up */
  router.post('/user/signup', function (req, res, next) {
    //let newuser =  await userobject.sigup(req.body)
    let newUser = new UserDB({
      email: req.body.email,
      password: req.body.password
    })
    UserDB.findOne({ email: req.body.email})
      .then(olduser => {
  
        if (olduser === null) {
          newUser.save()
            .then(newuser => {
              res.redirect('/user/profile')
            })
            .catch(err => {
              res({ "error": err })
            })
        }
        else {
          var messages = 'email is already exist';
          res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 })
  
        }
      })
  
  })
  /*--------------------------------------------------------------- */
  /* USER SIGN IN  */
  router.get('/user/signin', function (req, res, next) {
    res.render('user/signin', { csrfToken: req.csrfToken() })
  })
  router.post('/user/signin', function (req, res, next) {
    let newUser = new UserDB({
      email: req.body.email,
      password: req.body.password
    })
    console.log(req.body.email)
      if (req.body.email==""||req.body.password===""){
      var messages = ' missing email or pass ';
      res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 })
    }else{
    UserDB.findOne({ email: req.body.email})
      .then(olduser => {
        if (olduser === null) {
          var messages = 'email is not exist ';
          res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 })
      }
      else{
        console.log(olduser.password)
         console.log(olduser.email)
        if(req.body.password==olduser.password && req.body.email==olduser.email){
          res.redirect('/user/profile')
        }
        else{
          var messages = 'wrong password ';
          res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 })
        }
       
      }
    })
    }
  })
  
  
  
  /*--------------------------------------------------------------- */
  
  router.get('/user/profile', function (req, res, next) {
  
    res.render("user/profile")
  })
  
  
  module.exports = router;