// Connecting to MongoDB without Mongoose ORM
const { MongoClient } = require('mongodb'), format = require('util').format;
const { getRandomArbitrary, getRandomWhole, scoreRound, getRandomPcnt, generateRandomCountry, getProductId } = require('./seedHelper')
const { performance } = require('perf_hooks')

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log('error', err)
    client.close();
  } else {
    console.log('Connected');
    const db = client.db('newegg');
    const product = db.collection('product')
    product.drop();
    batchInsert(product)
      .then(() => {
        console.log('database succeeded')
        client.close()
      })
      .catch(() => {
        console.log('database not succeeded')
      })
  }
});



const seeder = (batch) => {
  let multiplier = getRandomPcnt(1, 25);
  let multipliedPrice = getRandomArbitrary(60, 220) * multiplier;
  let total = Math.round(((multipliedPrice * 100) / 100) - getRandomArbitrary(60, 220));
  const product = [];
  for (let i = 0; i < batch; i += 1) {
    product.push({
      productid: getProductId(1000000),
      priceproduct: getRandomArbitrary(60, 220),
      onlist: getRandomWhole(3, 20),
      country: generateRandomCountry(0, 3),
      originalprice: Math.round((multipliedPrice * 100) / 100),
      savedcash: Math.round((total * 100) / 100),
      savedpcnt: Math.round((multiplier - 1) * 100)
    });
  }
  return product;
}

//************************ using promise to throw data in batches ********************************//
const batchInsert = async (db) => {
  const batch = 100000
  const totalSize = 1000000;
  // console.log(`Data test: ${totalSize / 1000}k size with ${totalSize / batch} iterations`)
  console.log(`Data test: ${totalSize / 1000000}mil size with ${totalSize / batch} iterations`)

  const start = performance.now();

  for (let i = 0; i < totalSize; i += batch) {
    await db
      .insertMany(seeder(batch))
      .then(data => { })
      .catch(err => { console.log('error', err) })
  }
  const end = performance.now();
  console.log(`Performance: ${end - start} ms`)


  const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
  arr.reverse();
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
}


//Connecting to MongoDB with Mongoose ORM
// const mongoose = require('mongoose');
// //connect to database
// const db = mongoose.connect('mongodb://localhost:27017/newegg')

// //create schema
// let productSchema = mongoose.Schema({
//     productID: Number,
//     priceProduct: Number,
//     onList: Number,
//     country: String, 
//     originalPrice: Number,
//     savedCash: Number,
//     savedPcnt: String
// })

// let product = mongoose.model('product', productSchema);

