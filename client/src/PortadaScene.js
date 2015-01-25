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
        this.load.image('creditos', 'assets/interface/creditos.png');
        this.load.image('historia', 'assets/interface/historia.png');
        this.load.spritesheet('boton', 'assets/interface/botonesplay.png', 405, 251);
        this.load.spritesheet('botoncreditos', 'assets/interface/interfacecredits.png', 405, 251);
        this.load.spritesheet('botonback', 'assets/interface/botonback.png', 405, 251);
        this.load.audio('loop', ['assets/menu.mp3', 'assets/menu.ogg']);

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
        this.scaleWidth = this.scale.width;
        this.scaleHeight = this.scale.height;

        // Add button
        var buttonplay = this.add.button(this.scaleWidth-700,this.scaleHeight-550, 'boton', this.playOnClick, this, 1, 0, 0);
        buttonplay.onInputOver.add(this.playOver, this);
        buttonplay.onInputOut.add(this.playOut, this);
        buttonplay.onInputUp.add(this.playUp, this);

        var buttoncredits = this.add.button(this.scaleWidth-700, this.scaleHeight-300, 'botoncreditos', this.creditsOnClick, this, 1, 0, 0);
        buttoncredits.onInputOver.add(this.creditsOver, this);
        buttoncredits.onInputOut.add(this.creditsOut, this);
        buttoncredits.onInputUp.add(this.creditsUp, this);

        this.loopAudio = this.add.audio('loop', 0.6, true);
        this.loopAudio.play();

    };

    PortadaScene.prototype.playUp = function() {
        console.log('button up', arguments);
    };
    PortadaScene.prototype.playOver = function() {
        console.log('button over');
    };
    PortadaScene.prototype.playOut = function() {
        console.log('button out');
    };
    PortadaScene.prototype.playOnClick = function() {
        this.add.sprite(0, 0, 'historia');
        this.loopAudio.stop();
        setTimeout("Game.enableSockets()",7000);

    };
    PortadaScene.prototype.creditsUp = function() {
        console.log('button up', arguments);
    };
    PortadaScene.prototype.creditsOver = function() {
        console.log('button over');
    };
    PortadaScene.prototype.creditsOut = function() {
        console.log('button out');
    };
    PortadaScene.prototype.creditsOnClick = function() {
        this.add.sprite(0, 0, 'creditos');
        var buttonback = this.add.button(170, 10, 'botonback', this.backOnClick, this, 1, 0, 0);
        buttonback.onInputOver.add(this.backOver, this);
        buttonback.onInputOut.add(this.backOut, this);
        buttonback.onInputUp.add(this.backUp, this);
    };

    PortadaScene.prototype.backUp = function() {
        console.log('button up', arguments);
    };
    PortadaScene.prototype.backOver = function() {
        console.log('button over');
    };
    PortadaScene.prototype.backOut = function() {
        console.log('button out');
    };
    PortadaScene.prototype.backOnClick = function() {

        this.add.sprite(0, 0, 'portada');
        // Add button
        var buttonplay = this.add.button(this.scaleWidth-700,this.scaleHeight-550, 'boton', this.playOnClick, this, 1, 0, 0);
        buttonplay.onInputOver.add(this.playOver, this);
        buttonplay.onInputOut.add(this.playOut, this);
        buttonplay.onInputUp.add(this.playUp, this);

        var buttoncredits = this.add.button(this.scaleWidth-700, this.scaleHeight-300, 'botoncreditos', this.creditsOnClick, this, 1, 0, 0);
        buttoncredits.onInputOver.add(this.creditsOver, this);
        buttoncredits.onInputOut.add(this.creditsOut, this);
        buttoncredits.onInputUp.add(this.creditsUp, this);

    };

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
        if (this.scale.isFullScreen) {
         this.scale.stopFullScreen();
         } else {
         this.scale.startFullScreen(false);
         }
    };

    return PortadaScene;
})(LevelScene);
