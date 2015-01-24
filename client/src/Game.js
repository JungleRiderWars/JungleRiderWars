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
     * Ejecutada cuando se inicia el juevo
     */
    init: function() {
        this.phaser = new Phaser.Game(document.body.offsetWidth, document.body.offsetHeight, Phaser.AUTO, '', {
            preload: function() {
                Game.onPreload();
            },
            create: function() {
                Game.onCreate();
            }
        });

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
        var height = document.body.offsetHeight;
        var width = document.body.offsetWidth;
        this.phaser.width = width;
        this.phaser.height = height;
        this.phaser.stage.bounds.width = width;
        this.phaser.stage.bounds.height = height;
        if (this.phaser.renderType === Phaser.WEBGL)
        {
            this.phaser.renderer.resize(width, height);
        }
    },
    /**
     * Evento ejecutado en la precarga
     */
    onPreload: function() {
        this.phaser.load.image('logo', 'phaser.png');
    },
    /**
     * Evento ejeutado para crear el juego
     */
    onCreate: function() {
        var logo = this.phaser.add.sprite(this.phaser.world.centerX, this.phaser.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
};

