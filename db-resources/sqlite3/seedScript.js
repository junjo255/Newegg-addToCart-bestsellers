const faker = require('faker');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function getRandomArbitrary(min, max) {
  let x = Math.round(Math.random() * (max - min) + min);
  let y = Math.round(Math.random() * (max - min) + min)/100;
  return x+y;
}

function getRandomWhole(min, max) {
  let x = Math.round(Math.random() * (max - min) + min);
  return x;
}

function scoreRound(num) {
  return Math.ceil(num * 100) / 100;
}

function getRandomPcnt(min, max) {
  let x = Math.round(Math.random() * (max - min) + min);
  return 1+(x/100);
}

function generateRandomCountry(min, max) {
  let x = Math.round(Math.random() * (max - min) + min);
  var countries = ['United States', 'Mexico', 'Canada', 'China']
  return countries[x];
}


var db = new sqlite3.Database(path.join(__dirname,'./addToCart.db'));
 
db.serialize(function() {
  for(var i = 1; i < 101; i++) {
    /*********
    PRODUCT
    ********** */
   let product = {};
   //generate product price, (60-220)
   product.price = getRandomArbitrary(60, 220);
   //generate on lists, (3-20)
   product.onList = getRandomWhole(3, 20);
   //generate country (canada, mexico, US)
   product.country = generateRandomCountry(0, 3);
   //generate original price
   let multiplier = getRandomPcnt(1, 25);
   let multipliedPrice = product.price*multiplier;
   product.originalPrice = Math.round(multipliedPrice*100) / 100;
   //generate the saved cash
   let total = product.originalPrice-product.price;
   product.savedCash = Math.round(total * 100) / 100;
   //generate saved pcnt
   product.savedPcnt = Math.round((multiplier-1)*100);


    let params = [i,
     product.price,
     product.onList,
     product.country,
     product.originalPrice,
     product.savedCash,
     product.savedPcnt
    ]
   db.run(`insert into product (
     productID,
     priceProduct,
     onList,
     country,
     originalPrice,
     savedCash,
     savedPcnt
   ) values (?,?,?,?,?,?,?)`, params, (err) => {
    if (err) {
      console.log(err);
    }
   });

     for(var j = 1; j < 4; j++) {

         /*********
         Competition
        ********** */
        let competitor = {};
        //generate # of reviews (10-1200)
        competitor.numReviews = getRandomWhole(8, 1200);
        //generate delivery % (50-97)
        competitor.deliveryPcnt = getRandomArbitrary(50, 97);
        //product % (50-97)
        competitor.productPcnt = getRandomArbitrary(50, 97);
        //customer service % (50-97)
        competitor.servicePcnt = getRandomArbitrary(50, 97);
        //review score (delivery%+product%+service%)/3
        competitor.reviewScore = Math.round((competitor.deliveryPcnt+competitor.productPcnt+competitor.servicePcnt)/3);
        //generate country (canada, mexico, US)
        competitor.country = faker.address.country();
        //console.log(competitor.country);
        //generate random company name
        competitor.companyName = faker.company.companyName();
        //generate price
        let percent = getRandomPcnt(1, 15);
        competitor.price = scoreRound(product.price*percent);

       let params2 = [i,
        competitor.numReviews,
        competitor.deliveryPcnt,
        competitor.productPcnt,
        competitor.servicePcnt,
        competitor.reviewScore,
        competitor.country,
        competitor.companyName,
        competitor.price]

       db.run(`insert into competitors (
productID,
numReviews,
deliveryPcnt,
productPcnt,
servicePcnt,
reviewScore,
country,
companyName,
price
       ) values (?,?,?,?,?,?,?,?,?)`, params2, (err) => {
         if (err) {
           console.log(err);
         }
       });
     }
 }
});
db.close();

