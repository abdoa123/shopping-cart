const mongoose = require('mongoose')

module.exports = class Userdb {

    constructor( uDB) {
         this.user = uDB
    }
async sigup(body){
    this.user
    .findOne({email:body.email},function(olduser){
        console.log(olduser)
        if(olduser===null){
            console.log("hello")
            let newUser = new this.user({
                email: body.email,
                password: body.password
            })
           
            newUser.save()
            .then(newUser => {
                return newUser
            })
            .catch(err => {
                return {"error": err}
            })
        }
        else{
            return false ;
        }
    })
}

async Signin(req){
    this.user
    .findOne({email:req.body.email})
        .then((user => {
            return user
        }))
        .catch(err => {
            return {"error": err}
        })
}
}