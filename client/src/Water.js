/**
 * Representa un tronco
 * 
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Water = (function(_super) {
    __extends(Water, _super);
    /**
     * Inicia un tronco
     */
    function Water(scene) {
        this.type = Water.TYPE;
        this.width = Water.WIDTH;
        this.height = Water.HEIGHT;
        this.repeat = true;
        this.index = 0;
        _super.call(this, scene);
    }
    /**
     * Añade las animaciones
     */
    Water.prototype.addAnimations = function() {
        this.sprite.animations.add('appear', [0], 0, this.repeat); // (key, framesarray, fps,repeat)

    };

    /**
     * On collision
     * @param Runner runner
     * @param Item item
     */
    Water.prototype.collisionHandler = function(runner, item) {
        _super.prototype.collisionHandler.call(this, runner, item);
        this.scene.runner.setInWater(true);
        console.log('te mojas y vas lento');
    };

    /**
     * Crea un water
     */
    Water.prototype.create = function() {
        _super.prototype.create.call(this);
        this.music = this.scene.add.audio('water', 1, false);
        this.collideSound = this.scene.add.audio('waterCollide', 1, false);
    };
    
    /**
     * Destruye un water
     */
    Water.prototype.destroy = function(){
         _super.prototype.destroy.call(this);
        this.music.stop();
        //this.sprite.destroy @todo
    };
    
    /**
     * OnGameZona  
     */
    Water.prototype.onGameZone = function(){
        _super.prototype.onGameZone.call(this);
        this.music.play();
    };

    Water.prototype.isOverlap = function() {
        return Water.OVERLAP;
    };

    Water.OVERLAP = true;
    Water.DELAY = 0;
    Water.nextUse = 0;
    Water.TYPE = 'water';
    Water.WIDTH = 398;
    Water.HEIGHT = 20;
    Water.AUDIO_FILES = [];
    return Water;
})(Item);