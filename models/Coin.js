const mongoose = require('mongoose'),
      Schema =  mongoose.Schema;

// Definicion de Coin
let Coin = new Schema( {
    name: String,
    value: Number
});

module.exports = mongoose.model('coin',Coin)
