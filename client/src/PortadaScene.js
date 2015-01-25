/**
 * Representa la escena de la portada
 * 
 * @extend Scene
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var PortadaScene = (function(_super) {
    __extends(PortadaScene, _super);
    /**
     * Inicia una escena de Portada
     * @param int difficulty
     */
    function PortadaScene() {
        _super.call(this);

        //Game.scene = this;
    }
    /**
     * Precarga de la escena
     */
    PortadaScene.prototype.preload = function() {
//        this.runner = new Runner(this);

        // Carga el background
        this.load.image('portada', 'assets/interface/portada.png');
        this.load.spritesheet('boton', 'assets/interface/botonesplay.png', 405, 251);
        //this.load.image('boton', 'assets/interface/boton.png');

        // Pre carga objetos (botones)
        /*for (var i in this.item) {
            this.load.spritesheet(this.item[i].TYPE, 'assets/item/' + this.item[i].TYPE + '.png', this.item[i].WIDTH, this.item[i].HEIGHT);
            for (var j in this.item[i].AUDIO_FILES) {
                this.load.audio(this.item[i].AUDIO_FILES[j], ['assets/item/' + this.item[i].AUDIO_FILES[j] + '.mp3', '/assets/item/' + this.item[i].AUDIO_FILES[j] + '.ogg']);
            }
        }*/

        // Works without focus
        this.stage.disableVisibilityChange = true;
        this.stage.disablePauseScreen = true;


    };

    /**
     * Crea la escena
     */
    PortadaScene.prototype.create = function() {
        this.time.inited = this.time.now;

        // FullScreen
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.refresh();
        this.input.onDown.add(this.goFull, this);

        // Add background
        this.add.sprite(0, 0, 'portada');
        // Add button
        var button = this.add.button(this.scale.width-800, this.scale.height-500, 'boton', this.actionOnClick, this, 1, 0, 0);
        button.onInputOver.add(this.buttonOver, this);
        button.onInputOut.add(this.buttonOut, this);
        button.onInputUp.add(this.buttonUp, this);

    };

    PortadaScene.prototype.buttonUp = function() {
        console.log('button up', arguments);
    };
    PortadaScene.prototype.buttonOver = function() {
        console.log('button over');
    };
    PortadaScene.prototype.buttonOut = function() {
        console.log('button out');
    };
    PortadaScene.prototype.actionOnClick = function() {
        console.log('button out');
    };
    function actionOnClick () {
        console.log('button out');
    }

    /**
     * Se ejecuta en cada frame
     */
    PortadaScene.prototype.update = function() {

    };

    /**
     * Renderiza
     */
    PortadaScene.prototype.render = function() {

    };
    

    /**
     * Se pone en pantalla completa
     */
    PortadaScene.prototype.goFull = function() {
        /*if (this.scale.isFullScreen) {
         this.scale.stopFullScreen();
         } else {
         this.scale.startFullScreen(false);
         }*/
    };

    return PortadaScene;
})(LevelScene);
