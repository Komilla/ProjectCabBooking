var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var driverSchema = mongoose.Schema(
{
sBrand	:String,
sEmail	:String,
sLicense	:String,
sMobile	:String,
sName	:String,
sPanNo	:String,
sPlate	:String,
sSegment	:String,
sUserrole	:String,
sVehicle	:String
});

var MyDriverObj = mongoose.model('driver', driverSchema);

router.post('/writeDriver', function (req, res)
{
  var myDriver = new MyDriverObj({
    sBrand	: req.body.cBrand,
    sEmail	: req.body.cEmail,
    sLicense	: req.body.cLicense,
    sMobile	: req.body.cMobile,
    sName	: req.body.cName,
    sPanNo	: req.body.cPanNo,
    sPlate	: req.body.cPlate,
    sSegment	: req.body.cSegment,
    sUserrole	: "driver",
    sVehicle	: req.body.cVehicle
});
myDriver.save(function(err,docs)
{
     console.log('Driver has been saved');
});
});

router.get('/readDriver', function(req, res)
{
MyDriverObj.find({}, function(err, data)
{
res.json(data);
});
});

router.get('/changeDriver/:id', function (req, res)
{
MyDriverObj.find({_id : req.params.id}, function (err, data) {
res.json(data);
console.log('Driver ID has been Found for Updating');
});
});

router.put('/amendDriver/:id', function(req, res)
{
MyDriverObj.findOneAndUpdate({_id:req.params.id},
{
  $set:
  {
    sBrand	: req.body.cBrand,
    sEmail	: req.body.cEmail,
    sLicense	: req.body.cLicense,
    sMobile	: req.body.cMobile,
    sName	: req.body.cName,
    sPanNo	: req.body.cPanNo,
    sPlate	: req.body.cPlate,
    sSegment	: req.body.cSegment,
    sUserrole	: "driver",
    sVehicle	: req.body.cVehicle
  }
},
{
  upsert: true
},
function (err, data)
{
res.json(data);
console.log('Driver has been Updated');
});
})

router.delete('/eraseDriver/:id', function(req, res)
{
MyDriverObj.remove(
{
_id: req.params.id
},
function(err, data)
{
console.log('Driver has been Deleted');
});
});

router.get('/readDriver/:cEmailofDriver', function (req, res)
{
  MyDriverObj.findOne({sEmail:req.params.cEmailofDriver},
  function(err,docs)
  {
    if (err)
    console.log(err);
    else
     res.json(docs);
  });
});

module.exports = router;
