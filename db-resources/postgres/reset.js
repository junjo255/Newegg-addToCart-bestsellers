const { Pool, Client } = require('pg');


const connectionString = 'postgresql://me:password@localhost:5432/junjo'

//connect to database
const pool = new Pool({
    connectionString: connectionString,
})



//if database exists, drop. if database does not exist, create
pool.connect()
.then(client => {
  client.query('DROP TABLE IF EXISTS product')
  .then((data) => {
    console.log('Table dropped')
  }).catch((err) => {
    console.log('Failed to drop table')
  })
  // primary key
  client.query(`CREATE TABLE product (
    PRODUCTID integer ,
    priceProduct integer,
    onList integer,
    country text,
    originalPrice integer,
    savedCash integer,
    savedPcnt text)
  `).then((data) => {
    console.log('Table created')
  }).catch((err) => {
    console.log('Failed to create table')
  })
}).catch(e => {
  client.release()
  console.log(err.stack);
})