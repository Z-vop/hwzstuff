var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var Datastore = require('nedb'), db = new Datastore({ filename: 'db/hackwarzdata.nedb', autoload: true });


io.on('connection', function(socket){


socket.on('connection', function(){console.log('connected');}
);



    console.log('connected');





});
//function changeWifi(){
//
////here is the var that represents the img for the wifi symbol
//
//
//console.log('hi');
////code that makes it so the wifi is blue it will turn red
//
//}






app.get('/', function(req, res){
    res.sendFile(__dirname + '/loginscreen.html');
});

app.get('/main', function(req, res){
    res.sendFile(__dirname + '/mainscreen.html');
});

http.listen(1100, function(){
    console.log('listening on *:1100');
});

