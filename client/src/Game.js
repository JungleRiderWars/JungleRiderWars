/**
 * Controla los eventos principales del juego
 * y procesos básicos (iniciación, actualización)
 * 
 * @author Pedro <pedrogamez@talitasia.com>
 * @author ...
 * @author ...
 */
var Game = {
    /**
     * Juego iniciado
     * @var Game
     */
    phaser: null,
    /**
     * Activar depuración
     * @type Boolean
     */
    DEBUG: true,
    /**
     * Velocidad por defecto
     */
    SPEED: 50,
    /**
     * Tamaño del juego y de los cuadrados
     */
    SIZE: {width: 1920, height: 1080, enemy: 600},
    /**
     * Gravedad
     * @vars number
     */
    GRAVITY: 1.5,
    /**
     * Altura inicial
     */
    INITIAL_HEIGHT: 200,
    /**
     * Ejecutada cuando se inicia el juevo
     */
    init: function () {
        this.phaser = new Phaser.Game(this.SIZE.width, this.SIZE.height, Phaser.AUTO);
        // Comunicaciones
        this.socket = null;

        this.enableSockets();
        this.addScenes();
        this.phaser.state.start('RunnerScene'); // Por ahora forzamos la escena
    },
    /**
     * Añade las escenas
     */
    addScenes: function () {
        this.phaser.state.add('RunnerScene', RunnerScene);
    },
    /**
     * Comunicaciones
     */
    enableSockets: function () {

        this.socket = io.connect();

        // Iniciamos el juego.
        this.socket.emit('boton jugar', '');

        // recibimos nuestra id.
        this.socket.on('me', function (n, tipo, playerx, playery) {
            me = n;
            if (tipo == 'jugador') {
                var t = game.add.text(game.world.centerX - 800, 80, 'Player', {
                    font: "65px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
            }
            // Si soy el observador, quito los controles de movimiento.
            else if (tipo == 'enemigo') {
                enemigo = true;
                var t = game.add.text(game.world.centerX - 800, 80, 'Enemy', {
                    font: "65px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
                player.reset(playerx, playery);
            }
            else {
                observer = true;
                var t = game.add.text(game.world.centerX - 800, 80, 'Observer', {
                    font: "65px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
                player.reset(playerx, playery);

            }

        });
        // Recibimos la comunicación del servidor.
        this.socket.on('sight', function (n, l, r, j, d, f) {

            // Si soy yo, no hago nada.
            if (n != me) {
                //game.debug.text(n, 20, 130);
                //me.debug.text('jump:' + j + ' duck:' + d + ' left:' + l + ' right:' + r + ' fire:' + f, 20, 150);
                // Si es nulo, eliminamos al jugador.
                if (l == null && r == null && j == null && d == null && f == null)
                    players[n] = null;

                left = l;
                right = r;
                jump = j;
                duck = d;
                fire = f;

            }
        });

        // Módulo del chat
        this.socket.on('chat message', function (msg) {
            console.log(msg);
            $('#messages').append($('<li>').text(msg));

        });
        this.socket.on('chat message broadcast', function (msg) {
            console.log(msg);
            $('#messages').append($('<li>').text(msg));
        });
    }
}

