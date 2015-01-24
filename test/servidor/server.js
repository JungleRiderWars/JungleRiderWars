'use strict';
var serverPort = process.env.PORT||3000;
var http = require('http').createServer(MyServer);
var fs = require('fs');
var io = require('socket.io').listen(http);
var nSight=0;
var gameEnd=0;
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
        console.log('conectado');
    if(stack.length)
        socket.player = stack.pop();
    else
        socket.player = nSight++;

    players[socket.player]=new Coords(0,0,5);

    //io.sockets.emit('sight', socket.player, left, right, jump, duck, fire);

    // Jugador es el primero que entra
    if(socket.player == 0) {
        jugador = socket.id;
        console.log(socket.id + ' connected as player');
        // Actualizamos botones en la pantalla de inicio.
        io.sockets.emit('estado juego',1);
        console.log('Boton Jugar-Estado juego 1')
        socket.emit('me', socket.player,0,null,null);

    }

    if(socket.player == 1) {
        enemigo = socket.id;
        console.log(socket.id + ' connected as enemy');
        socket.emit('me', socket.player,1,players[0].x,players[0].y);
        console.log(socket.player+ ' ' + players[0].x+ ' ' +players[0].y);
        io.sockets.emit('chat message broadcast', socket.id + 'connected as enemy');
        // Actualizamos botones en la pantalla de inicio.
        io.sockets.emit('estado juego',2);
        console.log('Boton Jugar-Estado juego 2')
    }

    if(socket.player > 1) {
        console.log(socket.id + ' connected as observer');
        socket.emit('me', socket.player,2,players[0].x,players[0].y);
        console.log(socket.player+ ' ' + players[0].x+ ' ' +players[0].y);
        io.sockets.emit('chat message broadcast', socket.id + 'connected as observer');
        console.log('Boton Jugar-Estado juego 2')
    }
    });

    socket.on('mySight', function(left, right, jump, duck, fire,x,y) {
        //socket.volatile.emit('sight', socket.player, left, right, jump, duck, fire);
        // Si es el jugador el que se mueve, lo transmite a los demás
        if (jugador == socket.id) {
            players[0].x = x;
            players[0].y = y;
            io.sockets.emit('sight', socket.player, left, right, jump, duck, fire);
            console.log('Player:' + socket.player + '  jump:' + jump + ' duck:' + duck + ' left:' + left + ' right:' + right + ' fire:' + fire);
        }
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

    socket.on('disconnect', function(){
        io.sockets.emit('sight', socket.player, null, null, null, null, null);

        if(socket.id == jugador)
        {
            jugador = 0;
            console.log('Player' + socket.player + ' disconnected.');
            io.sockets.emit('estado juego',0);
        }
        else if(socket.id == enemigo)
        {
            enemigo = 0;
            console.log('Enemy' + socket.player + ' disconnected.');
            // Actualizamos botones en la pantalla de inicio.
            io.sockets.emit('estado juego',1);
        }
        else
        {
            console.log('Observer' + socket.player + ' disconnected.');
        }


            stack.push(socket.player);
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

function Coords(left, right, jump, duck, fire, x, y, velocity){
    this.left=(left==null)?false:left;
    this.right=(right==null)?false:right;
    this.jump=(jump==null)?false:jump;
    this.duck=(duck==null)?false:duck;
    this.fire=(fire==null)?false:fire;
    this.x=(x==null)?false:x;
    this.y=(y==null)?false:y;

    this.velocity=(velocity==null)?0:velocity;
}

