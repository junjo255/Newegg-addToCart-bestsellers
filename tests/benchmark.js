siege(__dirname + '/withCluster.js')
  .on(3000)
  .for(10000).times
  .get('/')
  .attack()

  