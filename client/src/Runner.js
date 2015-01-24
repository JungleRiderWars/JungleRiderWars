/**
 * Representa al jugador
 * 
 * @extend Player
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Runner = (function(_super) {
    __extends(Runner, _super);
    /**
     * Inicia al corredor
     * @param Scene scene
     */
    function Runner(scene) {
        _super.call(this);
        this.scene = scene;
        scene.load.spritesheet('runner', 'assets/runner.png', 50, 50);
        this.isJumping = false;
        this.inGround = true;
        this.velocity = 0;
        this.isGround = true;
        this.nextJump = 0;
    }

    /**
     * Crea el corredor
     */
    Runner.prototype.create = function() {
        this.sprite = this.scene.add.sprite(this.scene.world.width / 2 - 25, Game.INITIAL_HEIGHT, 'runner');
        this.scene.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.setSize(25, 50, 12, 0);
        this.sprite.body.collideWorldBounds = true;
        this.addAnimations();

        // Keyboard
        this.scene.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        var space = this.scene.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.onDownSpace, this);
        space.onUp.add(this.onUpSpace, this);
        var left = this.scene.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(this.onDownLeft, this);
        left.onUp.add(this.onUpLeft, this);
        var right = this.scene.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(this.onDownRight, this);
        right.onUp.add(this.onUpRight, this);

    };
    /**
     * Añade las animaciones a la escena
     */
    Runner.prototype.addAnimations = function() {
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
    Runner.prototype.update = function() {

        if( this.sprite.body.x < 25 ){
            console.log('Game over');
            this.sprite.body.x = 150;
        }
        
        this.scene.speed = Game.SPEED + this.velocity*2;
        
        if (!this.inGround && this.sprite.x === Game.INITIAL_HEIGHT) {
            this.inGround = true;
        }

        if (this.isJumping && this.scene.time.now < this.nextJump) {
            this.sprite.loadTexture('runner', 5);
            this.sprite.body.velocity.y = -400;
        }

        else if (this.isStay)
            this.sprite.loadTexture('runner', 0);

        else if (this.velocity < 0)
            this.sprite.animations.play('walk');

        else if (this.velocity > 0)
            this.sprite.animations.play('sprint');

        else
            this.sprite.animations.play('running');
        
        if( this.sprite.y === 390 /*Game.INITIAL_HEIGHT*/)
            this.isGround = true;

        this.sprite.body.velocity.x = this.velocity*100;

    };

    /**
     * Evento al presionar espacio
     */
    Runner.prototype.onDownSpace = function() {
        if (!this.isJumping && this.canJump() && this.scene.time.now > this.nextJump){
            this.isGround = false;
            this.isJumping = true;
            this.nextJump = this.scene.time.now + 100;
        }
    };

    /**
     * Evento al soltar espacio
     */
    Runner.prototype.onUpSpace = function() {
        this.isJumping = false;
    };

    /**
     * Evento al presionar izquierda
     */
    Runner.prototype.onDownLeft = function() {
        this.velocity = -2;
    };

    /**
     * Evento al soltar izquierda
     */
    Runner.prototype.onUpLeft = function() {
        this.velocity = 0;
    };

    /**
     * Evento al presionar derecha
     */
    Runner.prototype.onDownRight = function() {
       this.velocity = 2;
    };

    /**
     * Evento al soltar derecha
     */
    Runner.prototype.onUpRight = function() {
       this.velocity = 0;
    };
    
    /**
     * Comprueba si puede saltar
     * @return bool
     */
    Runner.prototype.canJump = function(){
        if( !this.isGround )
            return false;
        return true;
    };

    return Runner;
})(Player);