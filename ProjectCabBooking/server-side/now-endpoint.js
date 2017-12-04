var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var ridenowSchema = mongoose.Schema(
{

sAmount	:String,
sCar	:String,
sDestin	:String,
sDistance	:String,
sDrMobile	:String,
sDrName	:String,
sDrPlate	:String,
sDrStatus	:String,
sEmailofDriver	:String,
sEmailofPass	:String,
sPaMobile	:String,
sPaName	:String,
sPaStatus	:String,
sReserveDate	:String,
sRideDate	:String,
sRideType	:String,
sSource	:String

});

var MyRidenowObj = mongoose.model('nowride', ridenowSchema);

router.post('/writeRidenow', function (req, res)
{
  var myRidenow = new MyRidenowObj({

  sAmount	: req.body.cAmount,
  sCar	: req.body.cCar,
  sDestin	: req.body.cDestin,
  sDistance	: req.body.cDistance,
  sDrMobile	: req.body.cDrMobile,
  sDrName	: req.body.cDrName,
  sDrPlate	: req.body.cDrPlate,
  sDrStatus	: req.body.cDrStatus,
  sEmailofDriver	: req.body.cEmailofDriver,
  sEmailofPass	: req.body.sEmailofPass,
  sPaMobile	: req.body.cPaMobile,
  sPaName	: req.body.cPaName,
  sPaStatus	: req.body.cPaStatus,
  sReserveDate	: req.body.cReserveDate,
  sRideDate	: req.body.cRideDate,
  sRideType	: req.body.cRideType,
  sSource	: req.body.cSource

});
myRidenow.save(function(err,docs)
{
     console.log('Ridenow has been saved');
});
});

router.get('/readRidenow', function(req, res)
{
MyRidenowObj.find({}, function(err, data)
{
res.json(data);
});
});
router.get('/changeRidenow/:id', function (req, res)
{
MyRidenowObj.find({_id : req.params.id}, function (err, data) {
res.json(data);
console.log('Ride ID has been Found for Updating');
});
});

router.delete('/eraseRidenow/:id', function(req, res)
{
MyRidenowObj.remove(
{
_id: req.params.id
},
function(err, data)
{
console.log('Ridenow has been Deleted');
});
});

router.get('/readRidenow/:cEmailofDriver/:cDrStatus', function (req, res) {
  MyRidenowObj.findOne({sEmailofDriver:req.params.cEmailofDriver ,sDrStatus:req.params.cDrStatus},function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});
router.get('/readRidenow2/:cEmailofPass/:cDrStatus', function (req, res) {
  MyRidenowObj.find({sEmailofPass:req.params.cEmailofPass ,sDrStatus:req.params.cDrStatus},function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});
router.get('/readRidenow1/:id/', function (req, res) {
  MyRidenowObj.find({sEmailofDriver:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});

router.get('/readRidenow/:id/', function (req, res) {
  MyRidenowObj.find({sEmailofPass:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});

router.get('/readRidenow/:id/:cUserrole', function (req, res) {
  MyRidenowObj.find({sEmailofPass:req.params.id,sRideType:req.params.cUserrole}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});

router.put('/amendRidenow/:data', function (req, res) {
  MyRidenowObj.update({_id:req.params.data},{$set:{sDrStatus:req.body.sDrStatus}}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});





//
// router.put('/amendRidenow1/:data', function (req, res) {
//   MyRidenowObj.update({_id:req.params.data},{$set:{
//     sAmount	: req.body.cAmount,
//     sCar	: req.body.cCar,
//     sDestin	: req.body.cDestin,
//     sDistance	: req.body.cDistance,
//     sDrMobile	: req.body.cDrMobile,
//     sDrName	: req.body.cDrName,
//     sDrPlate	: req.body.cDrPlate,
//     sDrStatus	: req.body.cDrStatus,
//     sEmailofDriver	: req.body.cEmailofDriver,
//     sEmailofPass	: req.body.sEmailofPass,
//     sPaMobile	: req.body.cPaMobile,
//     sPaName	: req.body.cPaName,
//     sPaStatus	: req.body.cPaStatus,
//     sReserveDate	: req.body.cReserveDate,
//     sRideDate	: req.body.cRideDate,
//     sRideType	: req.body.cRideType,
//     sSource	: req.body.cSource
//
//     //
//     // sDrStatus:req.body.cDrStatus,
//     // Drivername:req.body.dirname,
//     // Vehiclenumber:req.body.vehiclenumber,
//     // DriverEmail:req.body.cEmailofDriver,
//     // Drivermobilenumber:req.body.mobile
//   }}, function (err, docs) {
//     if (err) console.log('Error at get ' + err);
//     else
//      res.json(docs);
//   });
// });

module.exports = router;
