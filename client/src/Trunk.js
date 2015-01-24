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
        this.type = 'trunk';
        this.width = 1;
        this.height = 2;
        this.repeat = false;
        _super.call(this, scene);
    }
    /**
     * Añade las animaciones
     */
    Trunk.prototype.addAnimations = function() {
        this.sprite.animations.add('appear', [1, 2, 3, 4], 5, this.repeat); // (key, framesarray, fps,repeat)

    };

    Trunk.DELAY = 1;
    
    Trunk.nextUse = 0;
    return Trunk;
})(Item);