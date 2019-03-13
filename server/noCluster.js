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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'))
// })
app.use(express.static(path.join(__dirname + '/../client/dist')));
    app.get('/api/product/:id', (req, res) => {

        const { id } = req.params;

        db.then((result) => {
            result.findOne({ _id: ObjectID(id) })
                .then(data => {
                    if (data) {
                        console.log('succeeded')
                        res.send(data)
                    } else {
                        console.log('no')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })


    // console.log(db.db);
});


let port = process.env.PORT || 3005;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
})

