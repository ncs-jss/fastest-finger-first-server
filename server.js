var express = require("express");
var http = require('http');
var exec = require('child_process').exec;

var app = express();

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;
var token = process.env.token || "token";
app.set('port',port);
var io = require('socket.io').listen(app.listen(port));
console.log(`Listening on port ${port}`);

io.sockets.on('connection', (socket) => {
    console.log('sockets connected');
    socket.emit('connected', { message: 'sockets connected' });
});

app.get("/", (req, res) => {
    res.sendfile('./public/index.html');
});
app.get("/winner", (req, res) => {
    console.log(req.query.token);
    if(req.query.token === token){
        var winner = req.query.winner;
        io.sockets.emit('message', {winner});
        res.sendStatus(200);
    }else{
        res.sendStatus(422);
    }
});

