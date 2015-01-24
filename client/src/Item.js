/**
 * Representa un obstaculo
 * 
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Item = (function() {
    /**
     * Inicia un obstaculo
     */
    function Item(scene) {
        this.scene = scene;
        this.create();
    }
    /**
     * Crea un objeto en la escena
     */
    Item.prototype.create = function() {

        // TODO: Posición enviada por el enemigo
        this.sprite = this.scene.add.sprite(this.scene.world.width - 100, Game.INITIAL_HEIGHT, this.type);
        this.scene.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
        this.addAnimations();
       

    };
    /**
     * En cada frame
     */
    Item.prototype.update = function() {
        this.sprite.body.velocity.x = -this.scene.speed * 10;
        this.scene.physics.arcade.collide(this.scene.runner.sprite, this.sprite, this.collisionHandler, null, this);
        this.scene.physics.arcade.collide(this.scene.exit, this.sprite, this.destroy, null, this);
    };

    /**
     * On collision
     * @param Runner runner
     * @param Item item
     */
    Item.prototype.collisionHandler = function(runner, item) {
        this.scene.runner.isGround = true;
    };
    
    /**
     * Destruye el objeto
     */
    Item.prototype.destroy = function(){
      // TODO: Borrar objeto
      console.log('borrar objeto');
    };

    Item.nextUse = 0;
    return Item;
})();