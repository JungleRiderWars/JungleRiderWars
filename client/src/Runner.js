/**
 * Representa al jugador
 * 
 * @extend Scene
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Runner = (function(_super) {
    __extends(Runner, _super);
    /**
     * Inicia al corredor
     * @param Phaser.Sprite sprite
     */
    function Runner(sprite) {
        _super.call(this);
        this.sprite = sprite;

        //this.sprite.body.setCircle(22);  // collision circle 
        //this.sprite.body.fixedRotation = true; // do not rotate on collision
        //this.sprite.body.mass = 4;

        this.addAnimations();
    }
    /**
     * Añade las animaciones a la escena
     */
    Runner.prototype.addAnimations = function() {
        // add some animations
        this.sprite.animations.add('walk', [1, 2, 3, 4], 5, true);  // (key, framesarray, fps,repeat)
        this.sprite.animations.add('running', [1, 2, 3, 4], 10, true); 
        this.sprite.animations.add('sprint', [1, 2, 3, 4], 15, true);
        this.sprite.animations.add('duck', [11], 0, true);
        this.sprite.animations.add('duckwalk', [10, 11, 12], 3, true);
    };
    /**
     * Hace las actualizaciones del personaje
     * @param number velocity
     */
    Runner.prototype.update = function(velocity) {
        
        if( !velocity )
            this.sprite.loadTexture('runner', 0);
        
        else if( velocity < Game.SPEED )
            this.sprite.animations.play('walk');
        
        else if (velocity > Game.SPEED)
            this.sprite.animations.play('sprint');
        
        else this.sprite.animations.play('running');
    };
    return Runner;
})(Player);