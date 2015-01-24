/**
 * Representa la escena del corredor
 * 
 * @extend Scene
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var RunnerScene = (function(_super) {
    __extends(RunnerScene, _super);
    /**
     * Inicia una escena de correr
     * @param int difficulty
     */
    function RunnerScene(difficulty) {
        _super.call(this, difficulty);
        this.difficulty = difficulty;
        
        // Establece los fondos del juego
        this.background = [
            { speed: 1, image: 'background_back'},
            { speed: 2, image: 'background_mid'}
        ];
        
        // Velocidad
        this.speed = Game.SPEED;
    }
    /**
     * Precarga de la escena
     */
    RunnerScene.prototype.preload = function() {
        this.runner = new Runner(this);

        // Carga los background
        for(var i in this.background ){
            this.load.image( this.background[i].image, 'assets/scene/' + this.background[i].image + '.png');
        }
        
        this.stage.disableVisibilityChange = true;
        this.stage.disablePauseScreen = true;
    };
    
    /**
     * Crea la escena
     */
    RunnerScene.prototype.create = function() {
        
        this.world.setBounds( -50, 0, Game.SIZE.width+50, Game.SIZE.height-100);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 980*Game.GRAVITY;
        
        // Add background
        for(var i in this.background){
            this.background[i].sprite = this.add.tileSprite(0, 0, Game.SIZE.width, Game.SIZE.height, this.background[i].image);
        }
        
        this.runner.create();
    };
    /**
     * Se ejecuta en cada frame
     */
    RunnerScene.prototype.update = function() {

        this.runner.update();
        
        // Mueve los fondos
        for(var i in this.background){
            this.background[i].sprite.tilePosition.x -= this.speed * this.background[i].speed;
        }

    };
    RunnerScene.prototype.render = function() {

    };
    return RunnerScene;
})(LevelScene);
