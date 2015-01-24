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

        this.background_back = this.add.tileSprite(0, 0, this.stage.bounds.width, this.stage.bounds.height, 'background_back');
        this.background_mid = this.add.tileSprite(0, 0, this.stage.bounds.width, this.stage.bounds.height, 'background_mid');

        // setup runner
        this.runner = new Runner(this.add.sprite(350, this.world.height - 150, 'runner')); //create and position player

        this.cursor = this.input.keyboard.createCursorKeys();
    };
    /**
     * Se ejecuta en cada frame
     */
    RunnerScene.prototype.update = function() {

        var velocity = Game.SPEED;


        if (this.cursor.left.isDown)
            velocity -= 5;

        if (this.cursor.right.isDown)
            velocity += 5;
        
        if( this.cursor.up.isDown)
            velocity = 0;

        this.runner.update(velocity);

        this.background_back.tilePosition.x -= velocity;
        this.background_mid.tilePosition.x -= velocity - 2;

    };
    RunnerScene.prototype.render = function() {

    };
    return RunnerScene;
})(LevelScene);
