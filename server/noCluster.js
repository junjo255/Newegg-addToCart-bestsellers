const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../db-resources/MongoDB/index.js')


app.use(cors());
app.use(parser.json());
// app.use(compression());
app.use(
  parser.urlencoded({
    extended: true,
  })  
)



app.get('/api/product/:id', (req, res) => {
  //test that api path exists
    db.db.then((result) => {
    result.find({"productid": +req.params.id}).toArray((err, data)=> {
      if (err) {
        //test to see if there's an error
        console.log(err, ' error here');
      } else {
        //see if the expected data equals    
        res.send(data);
        res.end();
      }
    })
  })
   
    // console.log(db.db);
});


let port = process.env.PORT || 3005;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'))
// })
// app.use(express.static(path.join(__dirname + '/../client/dist')));

// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });


// app.get('/', (request, response) => {
//   response.send('hello')
// })
