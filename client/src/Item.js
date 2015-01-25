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
        this.animated = false;
        this.create();
    }
    /**
     * Crea un objeto en la escena
     */
    Item.prototype.create = function() {

        // TODO: Posición enviada por el enemigo
        this.sprite = this.scene.add.sprite(this.scene.world.width - 100, this.scene.world.height - Game.INITIAL_HEIGHT, this.type);
        this.scene.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
        this.addAnimations();

    };
    /**
     * En cada frame
     */
    Item.prototype.update = function() {
        this.scene.physics.arcade.collide(this.scene.runner.sprite, this.sprite, this.collisionHandler, null, this);
        this.scene.physics.arcade.overlap(this.scene.exit, this.sprite, this.destroy, null, this);
        this.scene.physics.arcade.overlap(this.scene.limit, this.sprite, this.onGameZone, null, this);
        this.sprite.body.velocity.x = -this.scene.speed * 10;
    };

    /**
     * On collision
     * @param Runner runner
     * @param Item item
     */
    Item.prototype.collisionHandler = function(runner, item) {
       
    };

    /**
     * Destruye el objeto
     */
    Item.prototype.destroy = function() {
        this.scene.itemsInScene[this.index] = null;
        
        delete this.scene.itemsInScene[this.index];
        
        console.log(this.scene.itemsInScene[this.index]);
    };

    /**
     * Se ejecuta cuando paa a la zona
     */
    Item.prototype.onGameZone = function() {
        if (!this.animated) {
            this.sprite.animations.play('appear');
            this.animated = true;
        }
    };

    Item.nextUse = 0;
    return Item;
})();