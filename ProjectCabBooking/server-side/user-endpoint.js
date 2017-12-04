var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');  // code for jwt security
var jwt = require('jsonwebtoken');  // code for jwt security
var userSchema = mongoose.Schema(
{
    Password: String,
    sUsername: String,
    sEmail: String,
    sMobile: String,
    sUserrole: String
});

//Encrypting Password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Decrypting Password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}

var MyUserObj = mongoose.model('user', userSchema);

router.post('/writeUser', function (req, res)
{
  var myUser = new MyUserObj();
    myUser.Password =  myUser.generateHash(req.body.Password);
    myUser.sUsername =  req.body.cUsername;
    myUser.sEmail =  req.body.cEmail;
    myUser.sMobile =  req.body.cMobile;
    myUser.sUserrole =  req.body.cUserrole;

myUser.save(function(err,docs)
{
     console.log('User has been saved');
});
});

router.post('/verifyUser', function(req, res) {
    MyUserObj.findOne({
        sEmail: req.body.cEmail
    }, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false
            });
            console.log(' Oh My God the E-Mail is incorrect ');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false
            });
            console.log(' Oh My God the Password is incorrect ');
        } else if (user) {
            var token = jwt.sign(user, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log(' Well Done E-Mail & Password matched !!! ');
     }
    });
});


router.get('/readUser', function(req, res)
{
MyUserObj.find({}, function(err, data)
{
res.json(data);
});
});
// router.get('/readUser/:id', function (req, res)
// {
// MyUserObj.find({_id : req.params.id}, function (err, data) {
// res.json(data);
// console.log('User ID has been Found for Updating');
// });
// });
router.put('/amendUser/:id', function(req, res)
{
var myUser = new MyUserObj();
MyUserObj.findOneAndUpdate({_id:req.params.id},
{
  $set:
  {
  Password :  myUser.generateHash(req.body.Password)
  }
},
{
  upsert: true
},
function (err, data)
{
res.json(data);
console.log('User has been Updated');
});
})
router.delete('/eraseUser/:id', function(req, res)
{
MyUserObj.remove(
{
_id: req.params.id
},
function(err, data)
{
console.log('User has been Deleted');
});
});

router.get('/readUser/:cEmail', function (req, res) {
  console.log("REACHED GET DATA ON SERVER");

  MyUserObj.findOne({sEmail:req.params.cEmail},
  function(err,docs)
  {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
  });
});
module.exports = router;
