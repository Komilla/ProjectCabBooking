var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var fareSchema = mongoose.Schema(
{
    sCar: String,
    sRelaxedRates: String,
    sBusyRates: String,
    sBusyStart: String,
    sBusyEnd: String
});

var MyFareObj = mongoose.model('fare', fareSchema);

router.post('/writeFare', function (req, res)
{
  var myFare = new MyFareObj({

     sCar : req.body.cCar,
     sRelaxedRates : req.body.cRelaxedRates,
     sBusyRates: req.body.cBusyRates,
     sBusyStart: req.body.cBusyStart,
     sBusyEnd: req.body.cBusyEnd
});
myFare.save(function(err,docs)
{
     console.log('Fare has been saved');
});
});

router.get('/readFare', function(req, res)
{
MyFareObj.find({}, function(err, data)
{
res.json(data);
});
});
router.get('/changeFare/:id', function (req, res)
{
MyFareObj.find({_id : req.params.id}, function (err, data) {
res.json(data);
console.log('Fare ID has been Found for Updating');
});
});

router.put('/amendFare/:id', function(req, res)
{
MyFareObj.findOneAndUpdate({_id:req.params.id},
{
  $set:
  {
    sCar : req.body.cCar,
    sRelaxedRates : req.body.cRelaxedRates,
    sBusyRates: req.body.cBusyRates,
    sBusyStart: req.body.cBusyStart,
    sBusyEnd: req.body.cBusyEnd
  }
},
{
  upsert: true
},
function (err, data)
{
res.json(data);
console.log('Fare has been Updated');
});
})

router.delete('/eraseFare/:id', function(req, res)
{
MyFareObj.remove(
{
_id: req.params.id
},
function(err, data)
{
console.log('Fare has been Deleted');
});
});

router.put('/readDriver/:id', function (req, res)
{
  myDriver.findOneAndUpdate({_id:req.params.id},req.body, function (err, docs) {
    if (err)
    {
      res.json({invalid:tr});
    }
    else
    {
      res.json({success:true});
    }
  });
});


router.get('/readFare/:cCar', function (req, res) {
   MyFareObj.findOne({sCar:req.params.cCar},function(err,docs)   {
     if (err)
     console.log(err);
     else
      res.json(docs);
   });
 });

module.exports = router;
