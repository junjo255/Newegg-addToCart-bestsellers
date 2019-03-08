const cluster = require('cluster')
const os = require('os')
const express = require('express')
const isPrime = require('./is-prime')
const { spawn } = require('child_process');


if (cluster.isMaster) {
    const cpuCount = os.cpus().length
    console.log(`Forking ${cpuCount} CPUs`)
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }
}
else {
    const app = express()


    app.get('/', (req, res) => {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })

    const port = process.env.PORT || 3030

    app.listen(port)

    console.log('app is running on port', port)
}

cluster.on('exit', (worker) => {
    console.log('mayday! mayday! worker', worker.id, ' is no more!')
    cluster.fork()
})

// const os = require('os');
// const express = require('express')
// const isPrime = require('./is-prime')
// const { spawn } = require('child_process');
// const app = express()

// app.get('/', (req, res) => {
//     const primes = []
//     const max = Number(req.query.max) || 1000
//     for (let i = 1; i <= max; i++) {
//         if (isPrime(i)) primes.push(i)
//     }
//     res.json(primes)
// })

// app.listen(process.env.PORT || 3030)

// console.log('app is running!')

// module.exports = app