'use strict';
var serverPort = process.env.PORT||3000;
var http = require('http').createServer(MyServer);
var fs = require('fs');
var io = require('socket.io').listen(http);

var players=[];
var stack=[];
var jugador = 0;
var enemigo = 0;


var contentTypes={
    ".html":"text/html",
    ".css":"text/css",
    ".js":"application/javascript",
    ".png":"image/png",
    ".jpg":"image/jpeg",
    ".ico":"image/x-icon",
    ".m4a":"audio/mp4",
    ".oga":"audio/ogg"
};

http.listen(parseInt(serverPort,10), function(){
    console.log('Server is listening on port ' + serverPort);
});

function MyServer(request,response){
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = filePath.substr(filePath.lastIndexOf('.'));
    var contentType = contentTypes[extname];
    if(!contentType)
        contentType = 'application/octet-stream';

    fs.exists(filePath, function(exists){
        if(exists){
            fs.readFile(filePath, function(error, content){
                if(error){
                    response.writeHead(500, { 'Content-Type': 'text/html' });
                    response.end('<h1>500 Internal Server Error</h1>');
                }
                else{
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else{
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Not Found</h1>');
        }
    });
}

io.sockets.on('connection', function(socket){

    // Estado de los botones al inicio del juego.
    socket.on('jugar', function() {
        if(jugador == 0){
            socket.emit('estado juego', 0);
            console.log('jugar-Estado juego 0')
        }
        else if(enemigo == 0){
            socket.emit('estado juego', 1);
            console.log('jugar-Estado juego 1')
        }
        else{
            socket.emit('estado juego', 2);
            console.log('jugar-Estado juego 2')
        }

    });
    // Para incluir al jugador cuando pulsa el botón jugar.
    socket.on('boton jugar', function() {


        players[socket.id]=new Coords(null,null,null,null,null,null,null,null,null);

        //io.sockets.emit('sight', socket.player, left, right, jump, duck, fire);



        // Jugador es el primero que entra
        if(jugador == 0) {
            jugador = socket.id;
            players[jugador].rol = 'jugador';
            console.log(jugador + ' connected as player');
            // Actualizamos botones en la pantalla de inicio.
            io.sockets.emit('estado juego',1);
            console.log('Boton Jugar-Estado juego 1')
            socket.emit('me', jugador,'jugador',null,null);

        }
        else if(enemigo == 0) {
            enemigo = socket.id;
            players[enemigo].rol = 'enemigo';
            console.log(enemigo + ' connected as enemy');
            socket.emit('me', enemigo,'enemigo',players[jugador].x,players[jugador].y);
            io.sockets.emit('chat message broadcast', enemigo + 'connected as enemy');
            // Actualizamos botones en la pantalla de inicio.
            io.sockets.emit('estado juego',2);

        }
        else
        {
            players[socket.id].rol = 'observador';
            console.log(socket.id + ' connected as observer');
            socket.emit('me', socket.id,'observador',players[jugador].x,players[jugador].y);
            io.sockets.emit('chat message broadcast', socket.id + 'connected as observer');
        }
    });

    socket.on('mySight', function(left, right, jump, rolling,x,y) {
        //socket.volatile.emit('sight', socket.player, left, right, jump, duck, fire);
        // Si es el jugador el que se mueve, lo transmite a los demás
        if (jugador == socket.id) {
            players[jugador].x = x;
            players[jugador].y = y;
            io.sockets.emit('sight', socket.id, left, right, jump, rolling, x, y);
        }
        console.log('Player: '+ socket.id+' ->'+left+' '+right+' '+jump+' '+rolling+' '+x+' '+y)
    });

    socket.on('chat message', function(msg){
        if(socket.id == jugador)
            msg = 'Player - ' + socket.id + ': ' + msg;
        else if(socket.id == enemigo)
            msg = 'Enemy - ' + socket.id + ': ' + msg;
        else
            msg = 'Observer - ' + socket.id + ': ' + msg;

        io.emit('chat message', msg);
    });

    // Recepcion de haber añadido un objeto en la escena.
    socket.on('receive addObject', function(idObjeto) {
        io.sockets.emit('send addObject', idObjeto);
        console.log('Player: '+ socket.id+' - Envia Objeto: '+idObjeto)
    });

    socket.on('disconnect', function(){
        io.sockets.emit('sight', socket.id, null, null, null, null, null);

        if(socket.id == jugador)
        {
            jugador = 0;
            console.log('Player' + socket.id + ' disconnected.');
            io.sockets.emit('estado juego',0);
        }
        else if(socket.id == enemigo)
        {
            enemigo = 0;
            console.log('Enemy' + socket.id + ' disconnected.');
            // Actualizamos botones en la pantalla de inicio.
            io.sockets.emit('estado juego',1);
        }
        else
        {
            console.log('Observer' + socket.id + ' disconnected.');
        }

    });


});




function random(max){
    return ~~(Math.random()*max);
}

/*
function act(player){
    var now=Date.now();
    if(gameEnd-now<-1000){
        gameEnd=now+10000;
        io.sockets.emit('gameEnd', gameEnd);
        target.x=random(canvasWidth/10-1)*10+target.radius;
        target.y=random(canvasHeight/10-1)*10+target.radius;
        io.sockets.emit('target',target.x,target.y);
    }
    else if(gameEnd-now>0){
        if(players[player].distance(target)<0){
            io.sockets.emit('score',player,1);
            target.x=random(canvasWidth/10-1)*10+target.radius;
            target.y=random(canvasHeight/10-1)*10+target.radius;
            io.sockets.emit('target',target.x,target.y);
        }
    }
}*/

function Coords(left, right, jump, rolling, x, y,rol){
    this.left=(left==null)?false:left;
    this.right=(right==null)?false:right;
    this.jump=(jump==null)?false:jump;
    this.rolling=(rolling==null)?false:rolling;
    this.x=(x==null)?false:x;
    this.y=(y==null)?false:y;
    this.rol=(rol==null)?false:rol;
}

