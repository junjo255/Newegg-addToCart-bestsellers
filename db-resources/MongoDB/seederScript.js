// Connecting to MongoDB without Mongoose ORM
const { MongoClient } = require('mongodb'), format = require('util').format;
const { getRandomArbitrary, getRandomWhole, scoreRound, getRandomPcnt, generateRandomCountry, getProductId } = require('./seedHelper')
const { performance } = require('perf_hooks')
const faker = require('faker')

// const app = express();
// const path = require('path');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

MongoClient.connect(`mongodb://localhost:27017`, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log('error', err)
  } else {
    const db = client.db('newegg');
    const product = db.collection('product')
    console.log('Connected');
    // product.drop()
    // console.log('successfully dropped')
    batchInsert(product)
      .then(() => {
        console.log('database succeeded')
        client.close()
      })
      .catch(() => {
        console.log('database not succeeded')
      })
  }
})

const batchInsert = async (db) => {
  const batch = 10000
  const totalSize = 10000000;
  // console.log(`Data test: ${totalSize / 1000}k size with ${totalSize / batch} iterations`)
  console.log(`MongoDB test: ${totalSize / 1000000}mil size with ${totalSize / batch} iterations`)

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

const competitors = (min, max)=> {
  let products = []
  for (var i = 0; i < getRandomWhole(min, max) ; i++){
      products.push ({

          numReviews: getRandomWhole(8, 1200),
          //generate delivery % (50-97)
          deliveryPcnt :getRandomArbitrary(50, 97),
          //product % (50-97)
          productPcnt : getRandomArbitrary(50, 97),
          //customer service % (50-97)
          servicePcnt : getRandomArbitrary(50, 97),
          //review score (delivery%+product%+service%)/3
          reviewScore : Math.round((getRandomArbitrary(50, 97))),
          //generate country (canada, mexico, US)
          country : faker.address.country(),
          //console.log(competitor.country);
          //generate random company name
          companyName : faker.company.companyName(),
          //generate price
          price : scoreRound(getRandomWhole(8, 1200)* getRandomPcnt(1, 15))
      })
  }

  return products
}


const seeder = (batch) => {
  let multiplier = getRandomPcnt(1, 25);
  let multipliedPrice = getRandomArbitrary(60, 220) * multiplier;
  let total = Math.round(((multipliedPrice * 100) / 100) - getRandomArbitrary(60, 220));
  const product = [];
  for (let i = 0; i < batch; i += 1) {
    product.push({
      priceproduct: getRandomArbitrary(60, 220),
      onlist: getRandomWhole(3, 20),
      country: generateRandomCountry(0, 3),
      originalprice: Math.round((multipliedPrice * 100) / 100),
      savedcash: Math.round((total * 100) / 100),
      savedpcnt: Math.round((multiplier - 1) * 100),
      competitors: competitors(1,4)
    });
  }
  return product;
}
