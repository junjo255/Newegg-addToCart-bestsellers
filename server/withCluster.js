
const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../db-resources/MongoDB/index.js')
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const pid = process.pid;
// const { ObjectID } = require('mongodb')

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
    for (let i = 0; i < numCPUs; i++) {
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


    app.get('/api/product/:id', (req, res) => {
        //test that api path exists
        db.db.then((result) => {
            result.find({ "productid": +req.params.id }).toArray((err, data) => {
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
    });

    app.listen(port, () => {
        console.log(`Server: process ${pid} is listening `)
    })

}
