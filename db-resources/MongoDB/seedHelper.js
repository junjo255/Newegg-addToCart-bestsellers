
module.exports = {
    //generate random number
    getRandomArbitrary: (min, max) => {
        let x = Math.round(Math.random() * (max - min) + min);
        let y = Math.round(Math.random() * (max - min) + min) / 100;
        return x + y;
    },

    //generate random whole numbers
    getRandomWhole: (min, max) => {
        let x = Math.round(Math.random() * (max - min) + min);
        return x;
    },


    //generate score
    scoreRound: (num) => {
        return Math.ceil(num * 100) / 100;
    },

    //generate randome percent
    getRandomPcnt: (min, max) => {
        let x = Math.round(Math.random() * (max - min) + min);
        return 1 + (x / 100);
    },

    //generate product ID
    getProductId: (max) => {
        let x = (Math.floor(Math.random() * max))
        return x
    },

    //generate random country
    generateRandomCountry: (min, max) => {
        let x = Math.round(Math.random() * (max - min) + min);
        var countries = ['United States', 'Mexico', 'Canada', 'China']
        return countries[x];
    }


}

