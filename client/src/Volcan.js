/**
 * Representa un tronco
 * 
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Volcan = (function(_super) {
    __extends(Volcan, _super);
    /**
     * Inicia un tronco
     */
    function Volcan(scene) {
        this.type = Volcan.TYPE;
        this.width = Volcan.WIDTH;
        this.height = Volcan.HEIGHT;
        this.repeat = true;
        this.index = 0;
        _super.call(this, scene);
    }
    /**
     * Añade las animaciones
     */
    Volcan.prototype.addAnimations = function() {
        this.sprite.animations.add('appear', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17, 19, 20, 21, 22, 23, 24, 25], 120, this.repeat); // (key, framesarray, fps,repeat)

    };

    /**
     * On collision
     * @param Runner runner
     * @param Item item
     */
    Volcan.prototype.collisionHandler = function(runner, item) {
        _super.prototype.collisionHandler.call(this, runner, item);
        if(!this.collideSound.isPlaying)
        this.collideSound.play();
        console.log('te quemas');
    };

    /**
     * Crea un volcan
     */
    Volcan.prototype.create = function() {
        _super.prototype.create.call(this);
        this.music = this.scene.add.audio('volcan', 1.5, false);
        this.collideSound = this.scene.add.audio('volcanCollide', 1.5, false);
    };
    
    /**
     * Destruye un volcan
     */
    Volcan.prototype.destroy = function(){
         _super.prototype.destroy.call(this);
        this.music.stop();
        //this.sprite.destroy @todo
    };
    
    /**
     * OnGameZona  
     */
    Volcan.prototype.onGameZone = function(){
        _super.prototype.onGameZone.call(this);
        this.music.play();
    };

    Volcan.prototype.isOverlap = function() {
        return Volcan.OVERLAP;
    };

    Volcan.OVERLAP = false;
    Volcan.DELAY = 0;
    Volcan.nextUse = 0;
    Volcan.TYPE = 'volcan';
    Volcan.WIDTH = 301;
    Volcan.HEIGHT = 200;
    Volcan.AUDIO_FILES = ['volcan', 'volcanCollide'];
    return Volcan;
})(Item);