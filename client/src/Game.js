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
     * Velocidad
     */
    SPEED: 10,
    
    /**
     * Ejecutada cuando se inicia el juevo
     */
    init: function() {
        this.phaser = new Phaser.Game(800, 600, Phaser.AUTO);
        
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

