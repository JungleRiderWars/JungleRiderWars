/**
 * Representa la escena del corredor
 * 
 * @extend Scene
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var RunnerScene = (function(_super) {
    __extends(RunnerScene, _super);
    function RunnerScene(difficulty) {
        _super.call(this, difficulty);
        this.difficulty = difficulty;
    }
    /**
     * Precarga de la escena
     */
    RunnerScene.prototype.preload = function() {
        this.load.spritesheet('runner', 'assets/runner.png', 50, 50);
        this.load.image('background_back', 'assets/scene/background_back.png');
        this.load.image('background_mid', 'assets/scene/background_mid.png');
    };
    
    /**
     * Crea la escena
     */
    RunnerScene.prototype.create = function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.background_back = this.add.tileSprite(0, 0, Game.SIZE.width, Game.SIZE.height, 'background_back');
        this.background_mid = this.add.tileSprite(0, 0, Game.SIZE.width, Game.SIZE.height, 'background_mid');
        
        // setup runner XXX: La anchura de la imágen debería tomarla
        this.runner = new Runner(this.add.sprite(this.world.width/2-25, Game.INITIAL_HEIGHT, 'runner')); //create and position player
        this.physics.enable(this.runner.sprite, Phaser.Physics.ARCADE);
        this.runner.sprite.body.setSize(220, 10, 0, 0);
        
        // keyboard
        this.controls = this.input.keyboard.createCursorKeys();
        this.controls.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };
    /**
     * Se ejecuta en cada frame
     */
    RunnerScene.prototype.update = function() {

        var velocity = Game.SPEED;

        if (this.controls.left.isDown)
            velocity -= 5;

        if (this.controls.right.isDown)
            velocity += 5;

        if (this.controls.space.isDown )
            this.runner.jump();

        this.runner.update(velocity);
        this.background_back.tilePosition.x -= velocity;
        this.background_mid.tilePosition.x -= velocity - 2;

    };
    RunnerScene.prototype.render = function() {

    };
    return RunnerScene;
})(LevelScene);
