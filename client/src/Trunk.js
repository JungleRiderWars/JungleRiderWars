/**
 * Representa un tronco
 * 
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Trunk = (function(_super) {
    __extends(Trunk, _super);
    /**
     * Inicia un tronco
     */
    function Trunk(scene) {
        this.type = Trunk.TYPE;
        this.width = Trunk.WIDTH;
        this.height = Trunk.HEIGHT;
        this.repeat = false;
        _super.call(this, scene);
    }
    /**
     * Añade las animaciones
     */
    Trunk.prototype.addAnimations = function() {
        this.sprite.animations.add('appear', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17, 19, 20, 21, 22], 22, this.repeat); // (key, framesarray, fps,repeat)

    };

    /**
     * On collision
     * @param Runner runner
     * @param Item item
     */
    Trunk.prototype.collisionHandler = function(runner, item) {
        _super.prototype.collisionHandler.call(this, runner, item);
        //if (!this.collideSound.isPlaying)
        //    this.collideSound.play();
    };

    /**
     * Crea un trunk
     */
    Trunk.prototype.create = function() {
        _super.prototype.create.call(this);
        this.music = this.scene.add.audio('trunk', 1, false);
        //this.collideSound = this.scene.add.audio('trunkCollide', 1, false);
    };

    /**
     * Destruye un trunk
     */
    Trunk.prototype.destroy = function() {
        _super.prototype.destroy.call(this);
        this.music.stop();

    };

    /**
     * OnGameZona  
     */
    Trunk.prototype.onGameZone = function() {
        _super.prototype.onGameZone.call(this);
        this.music.play();
    };
    
    Trunk.DELAY = 1;
    Trunk.nextUse = 0;
    Trunk.TYPE = 'trunk';
    Trunk.WIDTH = 198;
    Trunk.HEIGHT = 310;
    Trunk.AUDIO_FILES = ['trunk', 'trunkCollide'];
    return Trunk;
})(Item);