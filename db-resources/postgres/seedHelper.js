

module.exports = {
  getRandomArbitrary: (min, max) => {
    let x = Math.round(Math.random() * (max - min) + min);
    let y = Math.round(Math.random() * (max - min) + min) / 100;
    return x + y;
  },

  getRandomWhole: (min, max) => {
    let x = Math.round(Math.random() * (max - min) + min);
    return x;
  },

  scoreRound: (num) => {
    return Math.ceil(num * 100) / 100;
  },


  getRandomPcnt: (min, max) => {
    let x = Math.round(Math.random() * (max - min) + min);
    return 1 + (x / 100);
  },


  getProductId: (max) => {
    let x = (Math.floor(Math.random() * max))
    return x
  },


  generateRandomCountry: (min, max) => {
    let x = Math.round(Math.random() * (max - min) + min);
    var countries = ['United States', 'Mexico', 'Canada', 'China']
    return countries[x];
  }


  // value: () => {
  //   var obj = {
  //     productID: 10000,
  //     price: getRandomArbitrary(60, 220),
  //     onList: getRandomWhole(3, 20),
  //     country: generateRandomCountry(0, 3),
  //     originalPrice: Math.round(multipliedPrice * 100) / 100,
  //     savedCash: Math.round((total * 100) / 100),
  //     savedPcnt: Math.round((multiplier - 1) * 100)
  //   }


  // }


  

}


