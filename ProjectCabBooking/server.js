var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client-side')));

var FareObj = require('./server-side/fare-endpoint.js');
var DriverObj = require('./server-side/driver-endpoint.js');
var UserObj = require('./server-side/user-endpoint.js');
var RidelocObj = require('./server-side/loc-endpoint.js');
var RidenowObj = require('./server-side/now-endpoint.js');
mongoose.connect('mongodb://localhost:27017/myprojectcabbooking');
var db = mongoose.connection;
db.on('open', function() {
    console.log(' Wonderful, you are connected to the Database :) ');
});
db.on('error', function(err) {
    console.log(err);
});
app.use('/fa', FareObj);
app.use('/dr', DriverObj);
app.use('/us', UserObj);
app.use('/loc', RidelocObj);
app.use('/now', RidenowObj);

//---------------------------------------------------------------------------------------------
//socket code starts here

app = require('http').Server(app);
var io = require('socket.io')(app);

io.on('connection', function (socket)
{
    socket.on('my other event', function (data1)
    {
      socket.broadcast.emit('my other event', {lat:data1.lat,lng:data1.lng,sEmail:data1.sEmail});
    });
    socket.on('client', function (data1)
    {
      socket.broadcast.emit('client', {cname :data1.cname,cmobile:data1.cmobile,pickuplocation:data1.pickuplocation,destination:data1.destination,cPlate:data1.cPlate});
    });
    socket.on('disconnect', function()
    {
      var socketVar = socket.id;
      socket.broadcast.emit('deleteMyUser', {soc:socketVar});
  });
});

//socket code ends here
//---------------------------------------------------------------------------------------------

app.listen(1111, function (req, res) {
    console.log(' Wow, You have started the server on port 1111');
});
