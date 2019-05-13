var express = require('express');
var router = express.Router();
var coins = require('../models/Coin');

/* GET coins listing. */
router.get('/', function (req, res, next) {
  coins.find({}, (err, docs) => {
    if (err) {
      res.status(400).json({
        "success": false
      })
    } else {
      res.status(200).json({
        "success": true,
        docs
      })
    }
  })
});

/* GET coin by id listing*/
router.get("/:id", function (req, res, next) {
  var id = req.params.id || "";
  if (id === "") {
    res.status(400).json({
      "success": false
    });
  } else {
    coins.findById(id, (err, coin) => {
      if (err) {
        res.status(400).json({
          "success": false
        });
      } else {
        res.status(200).json({
          "success": true,
          coin
        });
      }
    });
  }
});

/* PUT coin listing */
router.put("/", function(req,res,next){
    let data = {
      name: req.body.name,
      value: req.body.value
    };

    var coin = new coins(data);
    coin.save((err,iCoin)=>{
      if (err){
        res.status(400).json({"success": false})
      } else {
        res.status(200).json({"success": true, iCoin})
      }
    });
});

router.post("/",(req,res)=>  {


  let data = {
    name: req.body.name,
    value: req.body.value
  };

  coin.save((err, productStored)  =>{
      if(err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})


      res.status(200).send({coin:productStored})
  })
});

router.delete("/", (req,res)=>{

  let id = req.params.id|| "";
  
  coin.findById(id, (err,Coin)=>{
      if(err) res.status(500).send({message:`Error al borrar en la base de datos: ${err}`})
  
  
      coin.remove(err=>{
          if(err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})
          res.status(200).send({message:'Se ha eliminado'})
      })
      
  })
  });


module.exports = router;