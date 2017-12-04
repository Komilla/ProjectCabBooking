var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var ridelocSchema = mongoose.Schema(
{
lat	:Number,
lng	:Number,
Email	:String
});

var MyRidelocObj = mongoose.model('locride', ridelocSchema);

router.post('/writeRideloc', function (req, res)
{
  var myRideloc = new MyRidelocObj({
    lat : req.body.lat,
    lng: req.body.lng,
    Email : req.body.Email
});
myRideloc.save(function(err,docs)
{
     console.log('Rideloc has been saved');
});
});

router.get('/readRideloc', function(req, res)
{
MyRidelocObj.find({}, function(err, data)
{
res.json(data);
});
});
router.put('/amendRideloc/:id', function(req, res)
{
MyRidelocObj.findOneAndUpdate({_id:req.params.id},
{
  $set:
  {
    sRide : req.body.cRide,
    sSource : req.body.cSource,
    sDestin : req.body.cDestin,
    sCar : req.body.cCar,
    sDate : req.body.cDate,
    sHour : req.body.cHour,
    sMin : req.body.cMin,
    sAmPm : req.body.cAmPm,
    sDistance : req.body.cDistance,
    sAmount : req.body.cAmount
  }
},
{
  upsert: true
},
function (err, data)
{
res.json(data);
console.log('Rideloc has been Updated');
});
})

router.delete('/eraseRideloc/:id', function(req, res)
{
MyRidelocObj.remove(
{
_id: req.params.id
},
function(err, data)
{
console.log('Rideloc has been Deleted');
});
});
module.exports = router;
