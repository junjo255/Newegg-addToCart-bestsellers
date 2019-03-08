const path = require('path');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(path.join(__dirname,'./addToCart.db'));

db.serialize(function() {
  db.run(`create table product (
    productID integer primary key,
    priceProduct integer,
    onList integer,
    country text,
    originalPrice integer,
    savedCash integer,
    savedPcnt text
  )`);

  db.run(`create table competitors (
productID integer,
numReviews integer,
deliveryPcnt integer,
productPcnt integer,
servicePcnt integer,
reviewScore integer,
ountry text,
companyName text,
price integer
  )
    CONSTRAINT fk_product 
    FOREIGN KEY (productID) 
    REFERENCES product(productID)
    )`);
  });