const { MongoClient } = require('mongodb')

//asynchron function
//1. pass in a call back
//2. use promise
//3. Async/await

// Once MongoClient is connected , callback 
// mongodb://ec2-34-196-46-96.compute-1.amazonaws.com
// mongodb://ec2-3-83-102-24.compute-1.amazonaws.com

module.exports=( async () => {
    const client = await MongoClient.connect(`mongodb://ec2-54-89-235-208.compute-1.amazonaws.com`, { useNewUrlParser: true })

    const db = await client.db('newegg');
    const product = await db.collection('product')

    console.log('database successfully connected')
    // console.log(product)

    return product;
})()





