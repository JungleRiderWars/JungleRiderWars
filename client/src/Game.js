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
    init: function() {
        this.phaser = new Phaser.Game(this.SIZE.width, this.SIZE.height, Phaser.AUTO);

        this.addScenes();
        this.phaser.state.start('RunnerScene'); // Por ahora forzamos la escena
    },
    /**
     * Añade las escenas
     */
    addScenes: function() {
        this.phaser.state.add('RunnerScene', RunnerScene);
    }
};

