// pool.connect((err, client, done) => {
//   if (err) {
//     console.log('err on pool connection in DB', err);
//   } else {
//     product.forEach(unit => {
//       client.query("INSERT INTO product(productID,priceProduct,onList,country,originalPrice,savedCash,savedPcnt) VALUES ($1, $2::decimal, $3::decimal, $4, $5::decimal, $6::decimal, $7::decimal)",
//         [unit.productID, unit.price, unit.onList, unit.country, unit.originalPrice, unit.savedCash, unit.savedPcnt]
//         , (err, result) => {
//           if (err) {
//             console.log('error on query ', err);
//           }
//         })
//     })
//   }
// })

// var columnSet = new pgp.helpers.ColumnSet([
//     {name: 'productID', mod: '^', def: 0},
//     {name: 'priceProduct', cast: 'int[]'},
//     {name: 'onList' , cast: 'int[]'},
//     {name: 'country' , mod: ':json'},
//     {name: 'originalPrice' , cast: 'int[]'},
//     {name: 'savedCash' , cast: 'int[]'},
//     {name: 'savedPcnt' , cast: 'int[]'}], {table: 'product'})
//   const query = pgp.helpers.insert(arr, columnSet)


// var start = now()
/*********
Competitors
********** */
// var competitors = [];
// var percent = getRandomPcnt(1, 15);
// for (var j = 0; j < 5000000; j++) {
//   competitors.push({
//     productID: j,
//     numReviews : getRandomWhole(8, 1200),
//     deliveryPcnt : getRandomArbitrary(50, 97),
//     productPcnt : getRandomArbitrary(50, 97),
//     servicePcnt : getRandomArbitrary(50, 97),
//     reviewScore : Math.round((getRandomArbitrary(50, 97) + getRandomArbitrary(50, 97) + getRandomArbitrary(50, 97)) / 3),
//     country : generateRandomCountry(),
//     companyName : faker.company.companyName(),
//     price : scoreRound(getRandomArbitrary(60, 220) * percent)

//   })


//   // ************** competitors table data population ************************ //
//   pool.connect((err, client, done) => {
//     if (err) {
//       console.log('err on pool connection in DB', err);
//     } else {
//       competitors.forEach(unit => {
//         client.query("INSERT INTO competitors (productID, numReviews, deliveryPcnt, productPcnt, servicePcnt, reviewScore, country, companyName, price) VALUES ($1, $2::decimal, $3::decimal, $4::decimal, $5::decimal, $6::decimal, $7, $8, $9::decimal)", 
//         [unit.productID, unit.numReviews, unit.deliveryPcnt, unit.productPcnt, unit.servicePcnt, unit.reviewScore, unit.country, unit.companyName, unit.price]
//        , (err, result) => {
//             if (err) {
//               console.log('error on query ', err);
//             }
//           })
//       })
//     }
//   })
// }

// var end = now()

// console.log(`Database took ${end-start}ms @ 100000`);
// console.log(process.memoryUsage())
