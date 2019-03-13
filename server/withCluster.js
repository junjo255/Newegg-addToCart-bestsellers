
const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../db-resources/MongoDB/index.js')
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const { ObjectID } = require('mongodb')
const compression = require('compression')

app.use(cors());
app.use(parser.json());
// app.use(compression());
app.use(
    parser.urlencoded({
        extended: true,
    })
)



if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < 1; i++) {
        cluster.fork();

    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3005;
    const { spawn } = require('child_process');
    const pid = process.pid;

    app.use(compression())
    app.use(cors())
    app.use(parser.json());
    app.use(express.urlencoded({ extended: true }))

  

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

    })

    app.listen(port, () => {
        console.log(`connected to ${port} & Server: process ${pid} is listening `)
    })
// * everything --> pull down bundle -->
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })

}
