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
    DEBUG: false,
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
     * ID de conexión
     */
    CONNECTION_ID: 0,
    /**
     * Ejecutada cuando se inicia el juevo
     */
    init: function() {
        this.phaser = new Phaser.Game(this.SIZE.width, this.SIZE.height, Phaser.AUTO);
        // Comunicaciones
        this.socket = null;
        this.player = {};

        this.addScenes();
        //this.enableSockets();
        Game.phaser.state.start('PortadaScene'); // Por ahora forzamos la escena

    },
    /**
     * Añade las escenas
     */
    addScenes: function() {
        this.phaser.state.add('RunnerScene', RunnerScene);
        this.phaser.state.add('PortadaScene', PortadaScene);
    },

    /**
     * Comunicaciones
     */
    enableSockets: function() {

        this.socket = io.connect("http://10.11.60.144:3000");

        // Iniciamos el juego.
        this.socket.emit('boton jugar', '');

        // recibimos nuestra id.
        this.socket.on('me', function(id, tipo, playerx, playery) {
            Game.CONNECTION_ID = id;

            Game.player.type = tipo;
            Game.player.resetx = playerx;
            Game.player.resety = playery;
            Game.phaser.state.start('RunnerScene'); // Por ahora forzamos la escena

            
        });

        // Recibimos la comunicación del servidor.
        this.socket.on('sight', function(id, left, right, space, ctrl, x, y) {

            if (Game.sceme) {
                // Si soy yo, no hago nada.
                if (id !== Game.CONNECTION_ID) {
                    Game.scene.runner.onReceived(left, right, space, ctrl, x, y);
                }
            }
        });

        // Recibe un objeto
        this.socket.on('send addObject', function(type) {
            eval('var item = ' + type + ';');
            if (Game.scene.time.now > item.nextUse) {
                Game.scene.addItem(new item(Game.scene));
                item.nextUse = Game.scene.time.now + item.DELAY * 1000;
            }
        });

    }
}

