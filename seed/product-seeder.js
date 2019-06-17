var Product = require('../module/product')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var products =[ new Product({
  imgPath:'https://tonsofstores.com/wp-content/uploads/2018/12/Online-Shopping-For-Clothes-1.jpg',
  title:'google',
  description:'good',
  price:10 
}),
new Product({
  imgpath:'https://tonsofstores.com/wp-content/uploads/2018/12/Online-Shopping-For-Clothes-1.jpg',
  title:'game',
  description:'bad',
  price:12 
}),
new Product({
  imgpath:'https://tonsofstores.com/wp-content/uploads/2018/12/Online-Shopping-For-Clothes-1.jpg',
  title:'games',
  description:'perfect game ',
  price:10 
})
]
mongoose.connect('mongodb://localhost/shopping', {useNewUrlParser: true}).then(() => {
    console.log(`your database connected in product`)
    done()
  });

async function done(){
  var done=0;
  for (var i=0;i<products.length;i++){
      products[i].save(function(err,result){
          done++;
          console.log(done)
          if(done===products.length){
              exit();
          }
      });
  }
}

function exit(){
    mongoose.disconnect();
}