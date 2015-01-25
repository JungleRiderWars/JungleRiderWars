/**
 * Representa un tronco
 * 
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Pincho = (function(_super) {
    __extends(Pincho, _super);
    /**
     * Inicia un tronco
     */
    function Pincho(scene) {
        this.type = Pincho.TYPE;
        this.width = Pincho.WIDTH;
        this.height = Pincho.HEIGHT;
        this.repeat = true;
        this.index = 0;
        _super.call(this, scene);
    }
    /**
     * Añade las animaciones
     */
    Pincho.prototype.addAnimations = function() {
        this.sprite.animations.add('appear', [0], 0, this.repeat); // (key, framesarray, fps,repeat)

    };

    /**
     * On collision
     * @param Runner runner
     * @param Item item
     */
    Pincho.prototype.collisionHandler = function(runner, item) {
        _super.prototype.collisionHandler.call(this, runner, item);
        if(!this.collideSound.isPlaying)
            this.collideSound.play();

        this.scene.runner.score -= Pincho.SCORE_PENALTY;
        console.log('te pinchas');
    };

    /**
     * Crea un Pincho
     */
    Pincho.prototype.create = function() {
        _super.prototype.create.call(this);
        //this.music = this.scene.add.audio('Pincho', 1.5, false);
        this.collideSound = this.scene.add.audio('VolcanCollide', 1.5, false);
        this.sprite.body.setSize(Pincho.BOX_WIDTH, Pincho.BOX_HEIGHT, Pincho.BOX_OFFSET_X, Pincho.BOX_OFFSET_Y);
    };
    
    /**
     * Destruye un Pincho
     */
    Pincho.prototype.destroy = function(){
         _super.prototype.destroy.call(this);
        //this.music.stop();
        //this.sprite.destroy @todo
    };
    
    /**
     * OnGameZona  
     */
    Pincho.prototype.onGameZone = function(){
        _super.prototype.onGameZone.call(this);
        //this.music.play();
    };

    Pincho.prototype.isOverlap = function() {
        return Pincho.OVERLAP;
    };

    Pincho.OVERLAP = false;
    Pincho.DELAY = 0;
    Pincho.nextUse = 0;
    Pincho.TYPE = 'Pincho';
    Pincho.WIDTH = 257;
    Pincho.HEIGHT = 262;
    Pincho.BOX_WIDTH = 250;
    Pincho.BOX_HEIGHT = 100;
    Pincho.BOX_OFFSET_X = 10;
    Pincho.BOX_OFFSET_Y = 100;
    Pincho.AUDIO_FILES = ['VolcanCollide'];
    Pincho.SCORE_PENALTY = 50;
    return Pincho;
})(Item);