const { MongoClient } = require('mongodb'), format = require('util').format;


//asynchron function
//1. pass in a call back
//2. use promise
//3. Async/await


// Once MongoClient is connected , callback 

module.exports.db = (async () => {

    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })

    const db = await client.db('newegg');
    const product = await db.collection('product')


    console.log('database successfully connected')

    return product;

})();

