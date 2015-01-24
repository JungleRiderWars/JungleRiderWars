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
    SPEED: 10,
    
    /**
     * Tamaño del juego
     */
    SIZE: { width: 1920/3, height: 1080/3 },
    
    /**
     * Gravedad
     * @vars number
     */
    GRAVITY: 1,
    
    /**
     * Altura inicial
     */
    INITIAL_HEIGHT: 200,
    
    /**
     * Ejecutada cuando se inicia el juevo
     */
    init: function() {
        this.phaser = new Phaser.Game(this.SIZE.width, this.SIZE.height, Phaser.AUTO);
        //this.phaser.scale.startFullScreen(true); // FIXME: Activar fullscreen
        
        this.addScenes();
        this.phaser.state.start('RunnerScene'); // Por ahora forzamos la escena
        
        window.addEventListener('resize', function() {
            Game.onResize();
        });
    },
    /**
     * Evento ejecutado en redimensión de pantalla
     * 
     * @FIXME No redimensiona
     * @link http://www.html5gamedevs.com/topic/1638-changing-game-size-to-fit-page/
     */
    onResize: function() {
//        var height = document.body.offsetHeight;
//        var width = document.body.offsetWidth;
//        this.phaser.width = width;
//        this.phaser.height = height;
//        this.phaser.stage.bounds.width = width;
//        this.phaser.stage.bounds.height = height;
//        if (this.phaser.renderType === Phaser.WEBGL)
//        {
//            this.phaser.renderer.resize(width, height);
//        }
    },
    
    /**
     * Añade las escenas
     */
    addScenes: function(){
        this.phaser.state.add('RunnerScene', RunnerScene);
    }
    
};
